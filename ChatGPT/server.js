const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { OpenAI } = require('openai');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const openai = new OpenAI({
});
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('chat message', async (msg) => {
        console.log('message: ' + msg);

        try {
            const response = await openai.chat.completions.create({
                messages: [{ role: "system", content: msg }],
                model: "gpt-3.5-turbo",
              });
            
              console.log(response.choices[0].message.content.trim());

            io.emit('chat message', response.choices[0].message.content.trim());
        } catch (error) {
            console.error('Error:', error);
            
            socket.emit('chat message', 'Sorry, I encountered an error while processing your request.');
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

