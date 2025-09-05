# 🎮 Multiplayer Game Platform

A real-time multiplayer game platform built with Flask, Socket.IO, and vanilla JavaScript. Features room-based gameplay with chat, ready states, and match management.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Socket.IO Events](#socketio-events)
- [File Descriptions](#file-descriptions)

---

## 🎯 Overview
This platform allows players to:
- Create/join game rooms
- Chat with other players in real-time
- Mark themselves as ready for matches
- Start games when all players are ready
- Play in a shared game environment

---

## ✨ Features
- **Real-time Communication**: Instant messaging via Socket.IO
- **Room Management**: Create/join rooms with custom names
- **Player States**: Ready/not-ready indicators
- **Match System**: Automatic game start when conditions are met
- **Responsive Design**: Works on desktop and mobile
- **Persistent Data**: Player info stored in localStorage

---

## 📁 Project Structure
```
├── app.py                 # Flask backend with Socket.IO
├── templates/
│   ├── index.html         # Login/registration page
│   ├── room.html          # Room lobby with chat
│   └── game.html          # Game interface
├── static/
│   ├── css/
│   │   ├── main.css       # Login page styles
│   │   └── room.css       # Room lobby styles
│   ├── js/
│   │   ├── main.js        # Login form handling
│   │   ├── room.js        # Room lobby functionality
│   │   └── game.js        # Game interface logic
│   └── images/            # Backgrounds and assets
└── requirements.txt       # Python dependencies
```

---

## 🚀 Installation

1. **Clone the repository**
```bash
git clone [repository-url]
cd multiplayer-game-platform
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Run the application**
```bash
python app.py
```

4. **Access the application**
- Open http://localhost:5000 in your browser

---

## 🎮 Usage

1. **Login Page** (`/`)
   - Enter player name and room name
   - Click "Join Game" to enter the room

2. **Room Lobby** (`/room`)
   - See all players in the room
   - Chat with other players
   - Mark yourself as ready
   - Wait for game to start

3. **Game Interface** (`/game`)
   - Play the actual game
   - Real-time updates via Socket.IO

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Login page |
| GET/POST | `/room` | Room lobby |
| GET | `/game` | Game interface |

---

## ⚡ Socket.IO Events

### Client → Server
| Event | Data | Description |
|-------|------|-------------|
| `join_room` | `{playerName, roomName}` | Join a room |
| `send_message` | `{playerName, roomName, message}` | Send chat message |
| `toggle_ready` | `{playerName, roomName}` | Toggle ready state |
| `start_match` | `{roomName}` | Start the match |

### Server → Client
| Event | Data | Description |
|-------|------|-------------|
| `room_joined` | Room data | Successfully joined room |
| `update_players` | Player list | Updated player roster |
| `receive_message` | Message data | New chat message |
| `match_started` | - | Game starting signal |

---

## 📄 File Descriptions

### Backend (`app.py`)
- **Flask routes**: Handles HTTP requests for pages
- **Socket.IO handlers**: Manages real-time communication
- **Room management**: Creates and manages game rooms
- **Player tracking**: Tracks ready states and player lists

### Frontend Files

#### `templates/index.html`
- **Purpose**: Login/registration page
- **Features**:
  - Player name input
  - Room name input
  - "Join Game" button
  - Responsive design with desert background

#### `templates/room.html`
- **Purpose**: Room lobby interface
- **Features**:
  - Player list display
  - Real-time chat
  - Ready/not-ready toggle
  - Game start button
  - Back navigation

#### `templates/game.html`
- **Purpose**: Game interface
- **Features**:
  - Game canvas/area
  - Real-time game updates
  - Player interaction

#### `static/js/main.js`
- **Purpose**: Login form validation
- **Features**:
  - Input validation
  - LocalStorage integration
  - Form submission handling

#### `static/js/room.js`
- **Purpose**: Room lobby functionality
- **Features**:
  - Socket.IO connection
  - Chat system
  - Ready state management
  - Player list updates
  - Game start handling

#### `static/js/game.js`
- **Purpose**: Game interface logic
- **Features**:
  - Game state management
  - Real-time updates
  - Player interactions

#### `static/css/main.css`
- **Purpose**: Login page styling
- **Features**:
  - Responsive layout
  - Desert background theme
  - Form styling

#### `static/css/room.css`
- **Purpose**: Room lobby styling
- **Features**:
  - Chat interface
  - Player list styling
  - Ready state indicators

---

## 🔧 Configuration

### Environment Variables
- `SECRET_KEY`: Flask secret key (default: 'test1234')

### LocalStorage Keys
- `playerName`: Current player's name
- `roomName`: Current room name

---

## 🐛 Troubleshooting

**Issue**: "Join Game" button not working
**Solution**: Check browser console for Socket.IO connection errors

**Issue**: Players not appearing in room
**Solution**: Verify `join_room` event is being emitted correctly

**Issue**: Chat messages not showing
**Solution**: Check `receive_message` event listener in room.js

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify all dependencies are installed
3. Ensure Socket.IO server is running
4. Check network tab for failed requests

---

## 📝 License

This project is open source and available under the MIT License.
</result>
</attempt_completion>
