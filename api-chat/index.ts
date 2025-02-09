import express = require('express');
import expressWS from  'express-ws';
import cors from 'cors';
import{WebSocket} from 'ws';
import mongoose from "mongoose";
import config from "./config";


const app = express();
expressWS(app);

const port = 8000;

app.use(cors());

const router = express.Router();


const connectedUsers: WebSocket[] = [];

interface messageFromUser {
    username: string;
    message: string;
}

interface IncomingMessage {
    type: string;
    payload: messageFromUser;
}

let messages: messageFromUser[] = [];

router.ws('/chat', (ws,req) => {
    connectedUsers.push(ws);
    console.log('User connected. Users total - ', connectedUsers.length);

    ws.send(JSON.stringify({ type: "MESSAGES_HISTORY", payload: messages}));

    ws.on('message', (message) => {
        try {
            const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

            if (decodedMessage.type === 'SEND_MESSAGE') {
                messages.push(decodedMessage.payload);

                connectedUsers.forEach((usersWS) => {
                    usersWS.send(JSON.stringify({
                        type: "NEW_MESSAGE",
                        payload: decodedMessage.payload,
                    }));
                });
            }

        } catch (error) {
            ws.send(JSON.stringify({error: 'invalid message'}));
        }
    });

    ws.on('close', () => {
        console.log('User disconnected');
        const index = connectedUsers.indexOf(ws);
        if (index !== -1) {
            connectedUsers.splice(index, 1);
        }
        console.log('Users total - ', connectedUsers.length);
    });

});

app.use(router);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

run().catch((err) => console.log(err));
