 document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages');


    sendButton.addEventListener('click', () => {
        sendMessage();
    });

    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        let messageText = messageInput.value;
        console.log('Original message:', messageText);

        messageText = messageText.replace(":hey", "👋");
        messageText = messageText.replace(":)", "😄");
        messageText = messageText.replace(":(", "😞");
        console.log('Replaced message:', messageText);
    
        if (messageText.trim() !== '') {
            socket.emit('message', messageText);
            messageInput.value = '';
        }
    }

    socket.on('message', (message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
});
/*function sendMessage() {
    let messageText = messageInput.value;
    
    // Replace ":hey" with waving hand emoji
    messageText = messageText.replace("hey", "👋");

    if (messageText.trim() !== '') {
        socket.emit('message', messageText);
        messageInput.value = '';
    }
}*/
