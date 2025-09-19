
// Fix: Use firebase v8 compat types for User and Timestamp.
import type firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export type FirebaseUser = firebase.User;

export enum StudyTime {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Evening = 'Evening',
}

export enum StudyStyle {
  Collaborative = 'Collaborative',
  Independent = 'Independent',
  Mixed = 'Mixed',
}

export enum SubjectStrength {
  STEM = 'STEM',
  Humanities = 'Humanities',
  Arts = 'Arts',
  Languages = 'Languages',
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string | null;
  avatar: string;
  bio: string;
  studyTime: StudyTime;
  studyStyle: StudyStyle;
  subjectStrength: SubjectStrength;
  // Study tracking fields
  studySessions?: number;
  totalStudyHours?: number;
  lastStudyDate?: firebase.firestore.Timestamp;
  streak?: number;
  level?: number;
}

// UserPreferences can be a subset or the same as UserProfile for compatibility calculation
export type UserPreferences = Pick<UserProfile, 'studyTime' | 'studyStyle' | 'subjectStrength'>;


export interface ChatMessage {
  id?: string;
  role: 'user' | 'model';
  text: string;
  timestamp?: firebase.firestore.Timestamp;
}

export interface Group {
    id: string;
    name: string;
    subject: string;
    description: string;
    members: string[]; // array of user UIDs
    createdBy: string; // user UID
    createdAt: firebase.firestore.Timestamp;
}

export interface GroupChatMessage {
  id?: string;
  groupId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: firebase.firestore.Timestamp;
}

export interface Resource {
  id: string;
  resourceId?: string; // For compatibility with existing resources
  title: string;
  description: string;
  fileUrl: string;
  type: string; // document, video, link
  isProtected: boolean;
  password?: string;
  partnerIds?: string[];
  createdBy: string;
  createdAt: firebase.firestore.Timestamp;
  visibility: 'public' | 'private' | 'partners';
}

export interface Notification {
  id: string;
  type: "message" | "system" | "achievement";
  title?: string;
  message: string;
  receiverId: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  timestamp: firebase.firestore.Timestamp;
  read: boolean;
  chatId?: string;
  groupId?: string;
  actionType?: string;
}
