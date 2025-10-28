
export type Persona = 'Trainee' | 'Hiring Manager' | 'Trainer' | 'Compliance' | 'Exec' | 'Production Support';

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Persona[];
  department: string;
  startDate: string;
  avatar?: string;
  team?: string;
}

export enum ContentType {
  Document = 'Document',
  Video = 'Video',
  Link = 'Link',
}

export interface TrainingContent {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  content: string; // For Document: text content, for Video: embed URL, for Link: external URL
  tags: string[];
  creatorId: string;
  createdAt: string;
}

export interface TrainingObjective {
  id: string;
  title: string;
  description: string;
  targetRoles: Persona[];
  contentIds: string[];
  estimatedDays: number;
}

export interface UserObjective {
  id: string;
  userId: string;
  objectiveId: string;
  assignedDate: string;
  dueDate: string;
  progress: { [contentId: string]: boolean }; // contentId -> completed
  completed?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  contentId: string;
  questions: QuizQuestion[];
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title?: string;
  };
}
