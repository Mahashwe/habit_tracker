# Habit Tracker

A full-stack habit tracking application built with Django REST Framework and React Native (Expo). Track your daily habits, mark them as complete, and maintain consistency in your routines.

## Features

- ✅ Create and manage custom habits
- 📝 Add descriptions and set frequency goals for each habit
- ✓ Mark habits as done/undone with a simple checkbox
- 📊 Track when habits were last updated
- 🔄 Edit existing habits
- 🗑️ Delete habits you no longer need
- 📱 Cross-platform mobile support (iOS, Android, Web)

## Tech Stack

### Backend

- **Framework**: Django 5.x
- **API**: Django REST Framework
- **Database**: SQLite
- **Python**: 3.x

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
    │   └── edit_habits.tsx # Edit existing habits screen
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
pip install django djangorestframework django-cors-headers
```

5. Run migrations:

```bash
python manage.py migrate
```

6. Create a superuser (optional):

```bash
python manage.py createsuperuser
```

7. Start the development server:

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

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/tracker/habits/`      | Retrieve all habits            |
| POST   | `/tracker/habits/`      | Create a new habit             |
| GET    | `/tracker/habits/{id}/` | Retrieve a specific habit      |
| PUT    | `/tracker/habits/{id}/` | Update a habit                 |
| DELETE | `/tracker/habits/{id}/` | Delete a habit                 |
| PATCH  | `/tracker/track/{id}/`  | Toggle habit completion status |

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

## Usage

### Adding a Habit

1. Open the app
2. Tap the "+" button or navigate to "Add Habit"
3. Enter habit name, description, and frequency
4. Save the habit

### Tracking Habits

1. View your habits on the main screen
2. Tap the checkbox to mark a habit as complete/incomplete
3. The `last_updated` field tracks when the status was changed

### Editing Habits

1. Navigate to the "Edit Habits" screen
2. Select a habit to modify
3. Update details and save changes

### Deleting Habits

1. Go to the "Edit Habits" screen
2. Select a habit
3. Use the delete option to remove it

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

### Frontend Issues

- **Cannot connect to API**: Verify the BASE_URL in `api.ts` matches your backend IP
- **Dependencies issues**: Delete `node_modules` and run `npm install` again
- **Expo errors**: Clear cache with `npm start -- -c`

## Future Enhancements

- 📈 Statistics and progress tracking
- 🎨 Customizable habit categories with colors
- 🏆 Streaks and achievements
- 📅 Calendar view for habit history
- 🔔 Push notifications for habit reminders
- 👥 User authentication and profiles

---

**Last Updated**: February 2026
