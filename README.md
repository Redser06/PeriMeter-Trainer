# PeriMeter Training

An AI-powered onboarding and continuous learning platform for Product Managers, built with React, TypeScript, and Google's Gemini AI.

## Features

- **Multi-Role Support**: Different dashboards for Trainees, Trainers, Hiring Managers, Executives, Compliance, and Production Support
- **AI-Powered Learning**:
  - Generate quizzes from training content
  - Web search integration for research
  - Internal document search
  - AI-generated training plans
- **Interactive Training**: Progress tracking, objectives management, and personalized learning paths
- **Modern UI**: Built with Tailwind CSS and supports dark mode
- **Role-Based Access**: Users can switch between multiple roles if assigned

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Generative AI API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PeriMeter-Trainer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Google Generative AI API key:
```
API_KEY=your_google_genai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## Demo Accounts

You can log in with any of these demo accounts (password: any):

- **alex.chen@example.com** - Trainee
- **brenda.smith@example.com** - Hiring Manager
- **charles.doe@example.com** - Trainer
- **diana.prince@example.com** - Compliance
- **ethan.hunt@example.com** - Exec / Leader
- **grace.hopper@example.com** - Production Support

## Project Structure

```
PeriMeter-Trainer/
├── PeriMeterTraining/
│   ├── components/       # Reusable UI components
│   │   ├── layout/       # Header, Sidebar
│   │   ├── search/       # SearchBar
│   │   └── ui/           # Spinner and other UI elements
│   ├── context/          # React Context for state management
│   ├── screens/          # Main screen components for each role
│   ├── services/         # API services (Gemini AI integration)
│   ├── types.ts          # TypeScript type definitions
│   ├── constants.ts      # Mock data and constants
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Features by Role

### Trainee
- View assigned learning objectives
- Access training content (documents, videos, links)
- Take AI-generated quizzes
- Search internal docs and web resources
- Track progress on objectives

### Trainer
- Upload and manage training content
- View content library
- Create learning materials

### Hiring Manager
- Monitor trainee progress
- View team dashboards
- Assign objectives to team members

### Executive
- View organization-wide training metrics
- Monitor team performance
- Track ROI and onboarding time

### Compliance
- View audit logs
- Monitor PII/PCI scans
- Track system compliance

### Production Support
- Monitor system health
- View API call logs
- Track service status

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `API_KEY` | Google Generative AI API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License
