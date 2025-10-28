
import { User, TrainingContent, TrainingObjective, UserObjective, ContentType, Persona } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    roles: ['Trainee'],
    department: 'Product Management',
    startDate: '2024-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    team: 'Product Alpha',
  },
  {
    id: 'u2',
    name: 'Brenda Smith',
    email: 'brenda.smith@example.com',
    roles: ['Hiring Manager'],
    department: 'Human Resources',
    startDate: '2022-06-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Brenda',
  },
  {
    id: 'u3',
    name: 'Charles Doe',
    email: 'charles.doe@example.com',
    roles: ['Trainer'],
    department: 'Training & Development',
    startDate: '2021-03-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charles',
  },
  {
    id: 'u4',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    roles: ['Compliance'],
    department: 'Legal & Compliance',
    startDate: '2020-11-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
  },
  {
    id: 'u5',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    roles: ['Exec'],
    department: 'Executive Leadership',
    startDate: '2019-01-01',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ethan',
  },
  {
    id: 'u6',
    name: 'Grace Hopper',
    email: 'grace.hopper@example.com',
    roles: ['Production Support'],
    department: 'IT Operations',
    startDate: '2023-04-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
  },
];

export const MOCK_CONTENT: TrainingContent[] = [
  {
    id: 'c1',
    title: 'Introduction to Product Management',
    description: 'Learn the fundamentals of product management and the PM role.',
    type: ContentType.Document,
    content: `# Introduction to Product Management

Product management is a crucial organizational function that guides every step of a product's lifecycle, from development to positioning and pricing, by focusing on the product and its customers first and foremost.

## The Role of a Product Manager

A Product Manager (PM) is responsible for:

- **Vision & Strategy**: Setting the product vision and defining the strategy to achieve it
- **Roadmap Planning**: Creating and maintaining a product roadmap aligned with business goals
- **Cross-functional Leadership**: Working with engineering, design, marketing, sales, and other teams
- **Customer Focus**: Understanding customer needs and translating them into product requirements
- **Data-Driven Decision Making**: Using metrics and analytics to guide product decisions
- **Stakeholder Management**: Communicating progress and managing expectations across the organization

## Key Skills for Success

Successful product managers typically possess:

1. Strong communication and collaboration skills
2. Analytical thinking and problem-solving abilities
3. Technical understanding (varies by industry)
4. Business acumen and strategic thinking
5. User empathy and customer-centric mindset
6. Ability to prioritize and make trade-offs

## The Product Lifecycle

Product managers oversee products through various stages:

- **Discovery**: Identifying problems and opportunities
- **Development**: Working with teams to build solutions
- **Launch**: Coordinating go-to-market activities
- **Growth**: Optimizing for adoption and engagement
- **Maturity**: Maximizing value and exploring new opportunities
- **Decline**: Making decisions about end-of-life

Understanding these fundamentals will set you up for success in your product management journey.`,
    tags: ['fundamentals', 'product management', 'onboarding'],
    creatorId: 'u3',
    createdAt: '2024-01-01',
  },
  {
    id: 'c2',
    title: 'Agile Methodologies for PMs',
    description: 'Understanding agile frameworks and how PMs work within them.',
    type: ContentType.Document,
    content: `# Agile Methodologies for Product Managers

Agile is an iterative approach to software development that emphasizes flexibility, collaboration, and customer feedback.

## Core Agile Principles

- Individuals and interactions over processes and tools
- Working software over comprehensive documentation
- Customer collaboration over contract negotiation
- Responding to change over following a plan

## Scrum Framework

In Scrum, the PM often acts as or works closely with the Product Owner:

**Key Responsibilities:**
- Maintaining the product backlog
- Prioritizing user stories
- Defining acceptance criteria
- Participating in sprint planning, reviews, and retrospectives
- Making trade-off decisions

**Scrum Ceremonies:**
- Sprint Planning: Define what will be accomplished in the sprint
- Daily Standup: Brief check-ins on progress and blockers
- Sprint Review: Demo completed work to stakeholders
- Sprint Retrospective: Reflect on process improvements

## User Stories

Well-written user stories follow the format:
"As a [user type], I want [goal] so that [benefit]"

**Example:**
"As a new employee, I want to access training materials in one place so that I can efficiently complete my onboarding."

## Backlog Management

Effective backlog management includes:
1. Regular grooming sessions
2. Clear prioritization (using frameworks like RICE, MoSCoW)
3. Detailed acceptance criteria
4. Appropriate story sizing

By mastering agile methodologies, PMs can deliver value more quickly and respond to changing market conditions.`,
    tags: ['agile', 'scrum', 'methodologies'],
    creatorId: 'u3',
    createdAt: '2024-01-02',
  },
  {
    id: 'c3',
    title: 'Product Strategy & Roadmapping',
    description: 'How to develop effective product strategies and roadmaps.',
    type: ContentType.Document,
    content: `# Product Strategy & Roadmapping

A strong product strategy provides direction and helps align teams around common goals.

## Developing Product Strategy

**Components of a Product Strategy:**

1. **Vision**: Where you want the product to be in the future
2. **Goals**: Measurable objectives that support the vision
3. **Initiatives**: Key themes or bets to achieve the goals
4. **Features**: Specific capabilities that support initiatives

## Creating Product Roadmaps

A product roadmap is a strategic document that outlines the vision, direction, and progress of a product over time.

**Types of Roadmaps:**

- **Timeline-based**: Shows features on a calendar
- **Theme-based**: Organized by strategic themes or initiatives
- **Now-Next-Later**: Focuses on priorities without specific dates

**Best Practices:**

- Keep it flexible and adapt to feedback
- Focus on outcomes, not just outputs
- Communicate clearly with all stakeholders
- Review and update regularly
- Use it as a strategic communication tool

## Prioritization Frameworks

**RICE Scoring:**
- Reach: How many people will this impact?
- Impact: How much will it impact them?
- Confidence: How confident are you in your estimates?
- Effort: How much work will it require?

Score = (Reach × Impact × Confidence) / Effort

**MoSCoW Method:**
- Must have
- Should have
- Could have
- Won't have (this time)

Strategic thinking and clear roadmapping are essential skills for every product manager.`,
    tags: ['strategy', 'roadmap', 'planning'],
    creatorId: 'u3',
    createdAt: '2024-01-03',
  },
  {
    id: 'c4',
    title: 'Customer Discovery Techniques',
    description: 'Methods for understanding customer needs and validating assumptions.',
    type: ContentType.Video,
    content: 'https://www.youtube.com/embed/Jy-cDXkQ7WY',
    tags: ['customer research', 'discovery', 'interviews'],
    creatorId: 'u3',
    createdAt: '2024-01-04',
  },
  {
    id: 'c5',
    title: 'Data-Driven Product Decisions',
    description: 'Using analytics and metrics to guide product decisions.',
    type: ContentType.Link,
    content: 'https://www.productplan.com/learn/data-driven-product-management/',
    tags: ['analytics', 'metrics', 'data'],
    creatorId: 'u3',
    createdAt: '2024-01-05',
  },
];

export const MOCK_OBJECTIVES: TrainingObjective[] = [
  {
    id: 'obj1',
    title: 'Product Management Fundamentals',
    description: 'Master the core concepts and responsibilities of product management.',
    targetRoles: ['Trainee'],
    contentIds: ['c1', 'c2'],
    estimatedDays: 7,
  },
  {
    id: 'obj2',
    title: 'Strategic Product Planning',
    description: 'Learn to develop product strategies and roadmaps that drive business value.',
    targetRoles: ['Trainee', 'Trainer'],
    contentIds: ['c3'],
    estimatedDays: 5,
  },
  {
    id: 'obj3',
    title: 'Customer-Centric Product Development',
    description: 'Develop skills in customer research and data-driven decision making.',
    targetRoles: ['Trainee'],
    contentIds: ['c4', 'c5'],
    estimatedDays: 10,
  },
];

export const MOCK_USER_OBJECTIVES: UserObjective[] = [
  {
    id: 'uo1',
    userId: 'u1',
    objectiveId: 'obj1',
    assignedDate: '2024-01-15',
    dueDate: '2024-01-22',
    progress: {
      'c1': true,
      'c2': false,
    },
  },
  {
    id: 'uo2',
    userId: 'u1',
    objectiveId: 'obj2',
    assignedDate: '2024-01-15',
    dueDate: '2024-01-27',
    progress: {
      'c3': false,
    },
  },
  {
    id: 'uo3',
    userId: 'u1',
    objectiveId: 'obj3',
    assignedDate: '2024-01-15',
    dueDate: '2024-02-05',
    progress: {
      'c4': false,
      'c5': false,
    },
  },
];

export const ICONS = {
  dashboard: '📊',
  objectives: '🎯',
  content: '📄',
  users: '👥',
  reports: '📈',
  settings: '⚙️',
  search: '🔍',
  logout: '🚪',
  add: '➕',
  edit: '✏️',
  delete: '🗑️',
  check: '✅',
  close: '❌',
  learn: '📚',
  upload: '⬆️',
  compliance: '✓',
  support: '🛠️',
};
