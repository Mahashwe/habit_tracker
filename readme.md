# Habit Tracker

A full-stack habit tracking application built with Django REST Framework and React Native (Expo). Track your daily habits, mark them as complete, and maintain consistency in your routines.

## Features

- ✅ Create and manage custom habits
- 📝 Add descriptions and set frequency goals for each habit
- ✓ Mark habits as done/undone with a simple checkbox
- 📊 Track when habits were last updated
- 🎯 Automatic progress tracking - frequency decrements when habits are completed
- 🏆 Visual feedback for completed goals (habits with 0 frequency remaining)
- 📈 Completed goals counter on the main screen
- 🔄 Edit existing habits
- 🗑️ Delete habits directly from the main screen or edit page
- 🤖 **AI Assistant powered by Google Gemini** - Ask questions about habits and get personalized advice
- 📱 Cross-platform mobile support (iOS, Android, Web)

## Tech Stack

### Backend

- **Framework**: Django 6.x
- **API**: Django REST Framework
- **Database**: SQLite
- **Python**: 3.x
- **AI**: Google Generative AI (Gemini 2.5 Flash)
- **Environment Management**: python-dotenv

### Frontend

- **Framework**: React Native with Expo
- **Router**: Expo Router
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Navigation**: React Navigation
- **UI Components**: React Native core components with Expo enhancements

## Project Structure

```
habit_tracker/
├── backend/                 # Django backend
│   ├── config/             # Django settings and configuration
│   │   ├── settings.py     # Main settings file
│   │   ├── urls.py         # Root URL configuration
│   │   └── wsgi.py         # WSGI config
│   ├── tracker/            # Main app for habit tracking
│   │   ├── models.py       # Habit model
│   │   ├── serializers.py  # DRF serializers
│   │   ├── views.py        # API viewsets
│   │   ├── urls.py         # App URL routing
│   │   └── migrations/     # Database migrations
│   ├── db.sqlite3          # SQLite database
│   └── manage.py           # Django management script
│
└── frontend/               # React Native frontend
    ├── app/                # Expo Router screens
    │   ├── _layout.tsx     # Root layout
    │   ├── index.tsx       # Main habits list screen
    │   ├── add_habit.tsx   # Add new habit screen
    │   ├── edit_habits.tsx # Edit existing habits screen
    │   └── ai.tsx          # AI assistant screen
    ├── api/                # API layer
    │   └── api.ts          # Axios API functions
    ├── context/            # React Context
    │   └── habits.tsx      # Habits state management
    ├── assets/             # Images and static assets
    └── package.json        # Node dependencies
```

## Database Schema

### Habit Model

```python
- id: Primary Key (auto)
- habitName: CharField(max_length=100)
- habitDescription: TextField
- frequency: IntegerField
- done: BooleanField(default=False)
- last_updated: DateField(auto_now=True)
```

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm or yarn
- Expo CLI (optional, can use npx)
- Google Gemini API Key (for AI features) - Get one at [Google AI Studio](https://aistudio.google.com/app/apikey)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd habit_tracker/backend
```

2. Create a virtual environment:

```bash
python -m venv .venv
```

3. Activate the virtual environment:
   - Windows: `.venv\Scripts\activate`
   - macOS/Linux: `source .venv/bin/activate`

4. Install dependencies:

```bash
pip install django djangorestframework django-cors-headers python-dotenv google-generativeai
```

5. Create a `.env` file in the backend directory:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

6. Run migrations:

```bash
python manage.py migrate
```

7. Create a superuser (optional):

```bash
python manage.py createsuperuser
```

8. Start the development server:

```bash
python manage.py runserver 0.0.0.0:8000
```

The backend API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd habit_tracker/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Update the API base URL in [api/api.ts](frontend/api/api.ts):

```typescript
const BASE_URL = "http://YOUR_IP_ADDRESS:8000";
```

Replace `YOUR_IP_ADDRESS` with your local machine's IP address (important for mobile devices on the same network).

4. Start the Expo development server:

```bash
npm start
```

5. Run on your preferred platform:
   - **iOS**: Press `i` or run `npm run ios`
   - **Android**: Press `a` or run `npm run android`
   - **Web**: Press `w` or run `npm run web`

## API Endpoints

### Habits

| Method | Endpoint                | Description                                           |
| ------ | ----------------------- | ----------------------------------------------------- |
| GET    | `/tracker/habits/`      | Retrieve all habits                                   |
| POST   | `/tracker/habits/`      | Create a new habit                                    |
| GET    | `/tracker/habits/{id}/` | Retrieve a specific habit                             |
| PUT    | `/tracker/habits/{id}/` | Update a habit                                        |
| DELETE | `/tracker/habits/{id}/` | Delete a habit                                        |
| PATCH  | `/tracker/track/{id}/`  | Mark habit as done/undone (auto-decrements frequency) |
| POST   | `/tracker/ai/`          | Ask AI assistant about habits                         |

### Request/Response Examples

**Create Habit (POST)**

```json
{
  "habitName": "Morning Exercise",
  "habitDescription": "30 minutes of cardio",
  "frequency": 7,
  "done": false
}
```

**Update Habit Completion (PATCH)**

```json
{
  "done": true
}
```

Note: When `done` is set to `true`, the habit's frequency is automatically decremented by 1 (if greater than 0).

**Ask AI Assistant (POST)**

```json
{
  "prompt": "How can I stay motivated to exercise daily?"
}
```

**AI Response**

```json
{
  "answer": "Start small with 10-15 minute workouts. Schedule exercise at the same time daily. Find activities you genuinely enjoy. Track your progress to see improvements."
}
```

## Usage

### Adding a Habit

1. Open the app
2. Tap the "+" button or navigate to "Add Habit"
3. Enter habit name, description, and frequency
4. Save the habit

### Tracking Habits

1. View your habits on the main screen
2. Tap the checkbox to mark a habit as complete
3. When marked as done, the frequency counter automatically decreases by 1
4. Habits with 0 frequency remaining turn green (goal completed!)
5. The "Completed Goals" counter at the top shows your achievements
6. The `last_updated` field tracks when the status was changed

### Using the AI Assistant

1. Tap the "Try AI Feature" button on the main screen
2. Type your question about habits (e.g., "How do I build a morning routine?")
3. Tap "Ask AI" and wait for the response
4. Get personalized advice and tips about habit formation

### Editing Habits

1. Navigate to the "Edit Habits" screen
2. Select a habit to modify
3. Update details and save changes

### Deleting Habits

1. On the main screen, tap the "Delete" button on any habit card, or
2. Go to the "Edit Habits" screen to modify and delete habits

## Development

### Backend Development

- Django admin panel: `http://localhost:8000/admin/`
- API browsable interface: `http://localhost:8000/tracker/habits/`
- Run tests: `python manage.py test`

### Frontend Development

- TypeScript provides type safety for API calls
- Context API manages global habit state
- Expo Router handles navigation
- Hot reloading enabled for rapid development

### Adding New Features

1. **Backend**: Modify models, create migrations, update serializers and views
2. **Frontend**: Update TypeScript types, add API functions, create/modify screens

## Troubleshooting

### Backend Issues

- **Migration errors**: Delete `db.sqlite3` and run `python manage.py migrate` again
- **CORS errors**: Ensure `django-cors-headers` is installed and configured in settings
- **Port conflicts**: Change port with `python manage.py runserver 0.0.0.0:8001`
- **AI feature not working**: Verify your `GEMINI_API_KEY` is set correctly in the `.env` file
- **Environment variables not loading**: Ensure `python-dotenv` is installed and the `.env` file is in the backend root directory

### Frontend Issues

- **Cannot connect to API**: Verify the BASE_URL in `api.ts` matches your backend IP
- **Dependencies issues**: Delete `node_modules` and run `npm install` again
- **Expo errors**: Clear cache with `npm start -- -c`

## Current AI Capabilities

The AI assistant is powered by Google's Gemini 2.5 Flash model and can help with:

- Habit formation strategies and tips
- Motivation and accountability advice
- Overcoming common habit-building challenges
- Creating effective routines
- Time management suggestions

The AI is configured to provide concise, actionable advice (3-5 sentences) focused specifically on habit-related topics.

## Future Enhancements

- 📈 Advanced statistics and progress graphs
- 🎨 Customizable habit categories with colors
- 🏆 Streak tracking and achievements system
- 📅 Calendar view for habit history
- 🔔 Push notifications for habit reminders
- 👥 User authentication and profiles
- 🤖 Enhanced AI features (habit recommendations, personalized insights)
- 📊 Weekly/monthly progress reports
- 🔄 Data export and backup options

---

**Last Updated**: February 2026
