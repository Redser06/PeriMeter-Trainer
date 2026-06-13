import React from 'react';
import { Persona, User, TrainingContent, ContentType, TrainingObjective, UserObjective } from './types';

export const ICONS = {
  learn: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.782 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  dashboard: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  users: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  objectives: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  content: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
    </svg>
  ),
  upload: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  ),
  compliance: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  reports: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v12a2 2 0 01-2 2z" />
    </svg>
  ),
  support: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  logout: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
};

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    roles: [Persona.Trainee],
    team: 'Growth PM',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 'user-2',
    name: 'Brenda Smith',
    email: 'brenda.smith@example.com',
    roles: [Persona.HiringManager],
    team: 'Growth PM',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 'user-3',
    name: 'Charles Doe',
    email: 'charles.doe@example.com',
    roles: [Persona.Trainer],
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 'user-4',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    roles: [Persona.Compliance],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 'user-5',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    roles: [Persona.Exec],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 'user-6',
    name: 'Grace Hopper',
    email: 'grace.hopper@example.com',
    roles: [Persona.ProductionSupport],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
  },
];

export const MOCK_CONTENT: TrainingContent[] = [
  {
    id: 'content-1',
    title: 'Intro to Product Management',
    type: ContentType.Document,
    content: `Product Management is the practice of strategically directing every step of a product's lifecycle—from development and positioning to pricing and launching—by focusing on the product and its customers first.

Key Concepts:
1. Product-Market Fit (PMF): The degree to which a product satisfies a strong market demand.
2. Agile Methodology: A system of building software in short, iterative cycles called sprints.
3. backlog Grooming: The regular process of refining and prioritizing the product backlog to ensure the development team works on the most valuable tasks.`,
    tags: ['Foundational', 'Agile', 'Product Lifecycle'],
    creatorId: 'user-3',
    createdAt: '2026-05-10',
  },
  {
    id: 'content-2',
    title: 'Zopa Ways of Working',
    type: ContentType.Document,
    content: `Welcome to our organization! We build products centered around transparency, customer-centricity, and rapid iteration.

Important Acronyms you will hear:
- **GRP** (Growth & Retention Pod): The team responsible for onboarding and user retention loops.
- **CAC** (Customer Acquisition Cost): Total sales/marketing cost divided by new customers acquired.
- **LTV** (Lifetime Value): The total revenue we expect to make from a customer over their relationship.
- **PII** (Personally Identifiable Information): Any data that can identify an individual. Must be handled under strict GDPR guidelines.

Tools We Use:
- Jira: For task tracking and sprint planning.
- Confluence: For writing Product Requirement Documents (PRDs) and project specs.
- Slack: For quick communication.`,
    tags: ['Culture', 'Onboarding', 'Acronyms'],
    creatorId: 'user-3',
    createdAt: '2026-05-12',
  },
  {
    id: 'content-3',
    title: 'Compliance & Data Security Basics',
    type: ContentType.Document,
    content: `Ensuring data security and regulatory compliance is paramount for every product manager.

Key Guidelines:
1. PII Scan: Always ensure that our data logs and analytics tools do not contain plaintext PII (emails, names, phone numbers).
2. GDPR Compliance: Users must have the right to request deletion of their data (the "Right to be Forgotten").
3. PCI DSS: Never store credit card numbers in our databases. Use our tokenization services.`,
    tags: ['Security', 'Compliance', 'GDPR'],
    creatorId: 'user-3',
    createdAt: '2026-05-15',
  },
  {
    id: 'content-4',
    title: 'Vaporware to Value (Video)',
    type: ContentType.Video,
    content: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Rickroll for demonstration
    tags: ['Agile', 'Development', 'MVP'],
    creatorId: 'user-3',
    createdAt: '2026-05-20',
  },
];

export const MOCK_OBJECTIVES: TrainingObjective[] = [
  {
    id: 'obj-1',
    title: 'Foundational PM Onboarding',
    description: 'Learn the core product frameworks, engineering processes, and the company history.',
    contentIds: ['content-1', 'content-2'],
  },
  {
    id: 'obj-2',
    title: 'Security and Compliance Certification',
    description: 'Complete mandatory training on GDPR, data handling, and local regulations.',
    contentIds: ['content-3'],
  },
];

export const MOCK_USER_OBJECTIVES: UserObjective[] = [
  {
    userId: 'user-1',
    objectiveId: 'obj-1',
    progress: {
      'content-1': true,
      'content-2': false,
    },
    completed: false,
  },
  {
    userId: 'user-1',
    objectiveId: 'obj-2',
    progress: {
      'content-3': false,
    },
    completed: false,
  },
];
