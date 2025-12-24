# Productivity Dashboard

A modern, browser-based Productivity Dashboard designed to help users manage daily tasks, plan schedules, track goals, stay motivated, and monitor time — all in one place.

This project is built using HTML, CSS, and Vanilla JavaScript, with a strong focus on UI/UX, localStorage persistence, and clean client-side architecture.

Live Demo: https://gireejesh-nilesh.github.io/ProductivityDashboard/

## Features
### To-Do List

Add tasks with optional descriptions

Mark tasks as important

Persist tasks using localStorage

Mark tasks as completed (auto-removal)

### Daily Planner

Hourly planning from morning to night

Auto-saves input per hour

Data persists across refreshes

Clears automatically at the start of a new day

### Daily Goals (Sticky Notes)

Create goal cards with title and description

Sticky-note UI with random background colors

Drag-and-drop notes freely

Pin animation with random pin colors

“Achieved” button removes goal and updates storage

Positions persist using localStorage

### Pomodoro Timer

25-minute work session

5-minute break session

Start, pause, and reset controls

Session state auto-switching

### Motivation

Fetches a random motivational quote

Displays quote and author dynamically

### Weather & Time

Auto-detects user’s location (with permission)

Displays:

Current temperature

Weather condition

Wind speed

Humidity

Heat index

Real-time date and clock

City name auto-updates in UI

### Theme Toggle

Light/Dark theme switching

Uses CSS variables for smooth theme inversion

## Tech Stack

HTML5

CSS3

JavaScript (ES6+)

Browser APIs

Geolocation API

localStorage API

WeatherAPI.com (for weather data)

## Project Structure
├── index.html
├── style.css
├── script.js
├── config.example.js
├── .gitignore
└── README.md

## API Key Handling (Important)

This project uses WeatherAPI, but the API key is not committed to GitHub for security reasons.

✅ How API key is handled

config.js (contains the real API key) → ignored

config.example.js → committed for reference

## Setup Instructions
1️⃣ Clone the repository
git clone https://github.com/Gireejesh-Nilesh/ProductivityDashboard.git
cd ProductivityDashboard

2️⃣ Create config.js

Create a file named config.js in the project root:

window.WEATHER_API_KEY = "YOUR_WEATHER_API_KEY";


You can get a free API key from:
https://www.weatherapi.com/

3️⃣ Open the project

Simply open index.html in your browser
(or use Live Server for best experience).

## Permissions Required

Location access (for weather auto-detection)

If permission is denied, the app gracefully falls back to a default city.

## Design Principles

No frameworks — pure JavaScript

Component-based thinking

Minimal global state

UI-first approach

Defensive coding with fallbacks

Clean separation of concerns

## Future Enhancements (Planned / Possible)

Mobile touch drag support

Goal completion statistics

Cloud sync

Authentication

PWA support

Backend API proxy for weather

## Author

Nilesh Shakhya
Aspiring Frontend / Full Stack Developer
Focused on building clean, interactive, and scalable web applications.

## License

This project is licensed under the MIT License.
You are free to use, modify, and distribute it.