from flask import Flask, render_template, request, redirect, url_for
from flask_socketio import SocketIO, join_room, leave_room, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'test1234'
socketio = SocketIO(app, cors_allowed_origins="*")

rooms = {}


@app.route('/')
def home():
    return render_template('index.html')

@app.route('/room', methods=['GET', 'POST'])
def room():
    return render_template('room.html')

@app.route('/game')
def game():
    return render_template('game.html')

@socketio.on('join_room')
def handle_join_room(data):
    player_name = data.get('playerName')
    room_name = data.get('roomName')

    
    join_room(room_name)
    
    # Create room if it doesn't exist
    if room_name not in rooms:
        rooms[room_name] = {
            'players': [],
            'messages': []
        }
    
    # Add player to room if not already present
    player_exists = False
    for player in rooms[room_name]['players']:
        if player['name'] == player_name:
            player_exists = True
            break
    
    if not player_exists:
        rooms[room_name]['players'].append({
            'name': player_name,
            'ready': False
        })
    
    # Emit updated player list to all in room
    emit('update_players', rooms[room_name]['players'], room=room_name)

@socketio.on('send_message')
def handle_send_message(data):
    print("Received message:", data)
    player_name = data['playerName']
    room_name = data['roomName']
    message = data['message']
    
    # Store message
    if room_name in rooms:
        rooms[room_name]['messages'].append({
            'playerName': player_name,
            'message': message
        })
    
    # Broadcast message to room
    emit('receive_message', {
        'playerName': player_name,
        'message': message
    }, room=room_name)

@socketio.on('toggle_ready')
def handle_toggle_ready(data):
    player_name = data['playerName']
    room_name = data['roomName']
    
    # Toggle player ready status
    if room_name in rooms:
        for player in rooms[room_name]['players']:
            if player['name'] == player_name:
                player['ready'] = not player['ready']
                break
        
        # Emit updated player list
        emit('update_players', rooms[room_name]['players'], room=room_name)

@socketio.on('start_match')
def handle_start_match(data):
    room_name = data['roomName']
    
    # Check if all players are ready (at least 2 players)
    if room_name in rooms:
        players = rooms[room_name]['players']
        ready_players = [p for p in players if p['ready']]
        
        # Start match if at least 2 players are ready
        if len(ready_players) >= 1:
            emit('match_started', room=room_name)

@socketio.on('test')
def test(data):
    print(data)

@socketio.on('disconnect')
def handle_disconnect():
    # Handle player disconnection if needed
    pass

if __name__ == '__main__':
    app.run(debug=True)