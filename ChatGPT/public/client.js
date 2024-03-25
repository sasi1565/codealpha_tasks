const socket = io();

const chatLog = document.getElementById('chat-log');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        appendMessage('You', message);
        socket.emit('chat message', message);
        messageInput.value = '';
    }
});

socket.on('chat message', (msg) => {
    appendMessage('ChatGPT', msg);
});

function appendMessage(sender, message) {
    const formattedMessage = message.replace(/\n/g, '<br>');
    const li = document.createElement('li');
    li.classList.add('space')
    li.innerHTML = `${sender}:<br/> ${formattedMessage}`;
    chatLog.appendChild(li);
}

