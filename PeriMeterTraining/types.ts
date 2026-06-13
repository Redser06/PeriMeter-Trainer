export enum Persona {
  Trainee = 'Trainee',
  HiringManager = 'Hiring Manager',
  Trainer = 'Trainer',
  Compliance = 'Compliance',
  Exec = 'Exec / Leader',
  ProductionSupport = 'Production Support',
}

export enum ContentType {
  Document = 'Document',
  Video = 'Video',
  Link = 'Link',
  Quiz = 'Quiz',
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Persona[];
  team?: string;
  avatar: string;
}

export interface TrainingContent {
  id: string;
  title: string;
  type: ContentType;
  content: string;
  tags: string[];
  creatorId: string;
  createdAt: string;
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

export interface TrainingObjective {
  id: string;
  title: string;
  description: string;
  contentIds: string[];
}

export interface UserObjective {
  userId: string;
  objectiveId: string;
  progress: { [contentId: string]: boolean };
  completed: boolean;
}

export interface GroundingChunk {
  web: {
    uri: string;
    title?: string;
  };
}
