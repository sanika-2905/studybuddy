
import React, { useState, useEffect, useCallback } from 'react';
import { auth, db, isFirebaseConfigured } from './firebaseConfig';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FirebaseNotConfigured from './components/FirebaseNotConfigured';
import FirebaseConnectivityError from './components/FirebaseConnectivityError';
import { FirebaseUser } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [firestoreError, setFirestoreError] = useState<string | null>(null);
  const [isCheckingConnection, setIsCheckingConnection] = useState(true);

  // First, check if Firebase config is valid.
  if (!isFirebaseConfigured) {
    return <FirebaseNotConfigured />;
  }

  const checkFirestore = useCallback(async () => {
    setIsCheckingConnection(true);
    setFirestoreError(null); // Reset error before retrying
    try {
  // Perform a simple server-only read.
  // Use a non-reserved collection name for the health check. Firestore
  // reserves collection names wrapped in double underscores (e.g. __name__)
  // which will cause an error when accessed. Use `health_check` instead.
  // Avoid reserved document IDs that start/end with double underscores.
  // Use a simple non-reserved doc id for the health check.
  await db.collection('health_check').doc('health_check_doc').get({ source: 'server' });
      // If successful, it means the database exists and rules are open.
      setFirestoreError(null);
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        // This is a GOOD sign. It means the database is online and reachable,
        // but our health check is blocked by security rules (as it should be).
        // We can safely proceed.
        setFirestoreError(null);
      } else if (error.code === 'unavailable' || error.message.includes('offline')) {
        // This is the definitive "database not created" or "offline" error.
        setFirestoreError(
          'Could not connect to Firestore. This often means the database has not been created yet in your Firebase project. Please follow the steps below and retry.'
        );
      } else {
        // Handle other potential errors during startup.
        console.error("An unexpected Firestore error occurred:", error);
        setFirestoreError('An unexpected error occurred while connecting to the database.');
      }
    } finally {
      setIsCheckingConnection(false);
    }
  }, []);

  useEffect(() => {
    // Perform initial check on startup
    checkFirestore();

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [checkFirestore]);

  // The overall loading state depends on both auth and the initial connection check.
  // Show the loader only if there isn't already an error being displayed.
  if ((authLoading || isCheckingConnection) && !firestoreError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (firestoreError) {
    return <FirebaseConnectivityError message={firestoreError} onRetry={checkFirestore} isRetrying={isCheckingConnection} />;
  }

  if (!user) {
    return <Login />;
  }

  return <Dashboard user={user} />;
};

export default App;
