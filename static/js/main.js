// Очікуємо, поки DOM повністю завантажиться
document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо форму та поля вводу
    const loginForm = document.getElementById('login-form');
    const playerNameInput = document.getElementById('player-name');
    const roomNameInput = document.getElementById('room-name');
    
    // Обробляємо подію відправлення форми
    loginForm.addEventListener('submit', function(event) {
        // Перевіряємо введені дані перед відправкою
        const playerName = playerNameInput.value.trim();
        const roomName = roomNameInput.value.trim();
        
        // Перевіряємо, чи заповнені всі поля
        if (!playerName || !roomName) {
            event.preventDefault(); // Зупиняємо відправку форми
            alert('Будь ласка, введіть ім\'я гравця та назву кімнати');
            return;
        }
        
        // Зберігаємо дані в локальному сховищі браузера
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('roomName', roomName);
        
        // Дозволяємо стандартну відправку форми на сервер
        // Форма автоматично відправиться на /room методом POST
    });
});
