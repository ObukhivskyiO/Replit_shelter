// static/js/room.js

// Initialize SocketIO connection
const socket = io();

// Get player info from localStorage
const playerName = localStorage.getItem('playerName');
const roomName = localStorage.getItem('roomName');
socket.emit('test', {
    playerName: playerName,
    roomName: roomName,
})

// Update UI with player name
document.getElementById('current-username').textContent = playerName;

// Join the room
socket.emit('join_room', {playerName: playerName, roomName: roomName});

// Handle chat functionality
document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('message-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    
    if (message) {
        socket.emit('send_message', {
            playerName: playerName,
            roomName: roomName,
            message: message
        });
        messageInput.value = '';
    }
}

// Handle readiness
document.getElementById('ready-button').addEventListener('click', function() {
    socket.emit('toggle_ready', {
        playerName: playerName,
        roomName: roomName
    });
});

// Handle start match
document.getElementById('start-button').addEventListener('click', function() {
    socket.emit('start_match', {
        roomName: roomName
    });
});

// Handle back button
document.getElementById('back-button').addEventListener('click', function() {
    window.location.href = '/';
});

// SocketIO event listeners
socket.on('receive_message', function(data) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<strong>${data.playerName}:</strong> ${data.message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

socket.on('update_players', function(players) {
    const playersList = document.getElementById('players-list');
    playersList.innerHTML = '';
    
    players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.classList.add('player-item');
        
        const playerNameSpan = document.createElement('span');
        playerNameSpan.classList.add('player-name');
        playerNameSpan.textContent = player.name;
        
        const playerStatusSpan = document.createElement('span');
        playerStatusSpan.classList.add('player-status');
        if (player.ready) {
            playerStatusSpan.classList.add('ready');
            playerStatusSpan.textContent = 'Ready';
        } else {
            playerStatusSpan.classList.add('not-ready');
            playerStatusSpan.textContent = 'Not Ready!';
        }
        
        playerItem.appendChild(playerNameSpan);
        playerItem.appendChild(playerStatusSpan);
        playersList.appendChild(playerItem);
    });
    
    // Add empty slots to maintain layout
    for (let i = players.length; i < 16; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.classList.add('player-item', 'empty');
        playersList.appendChild(emptyItem);
    }
});

socket.on('match_started', function() {
    window.location.href = '/game';
});