import express from "express";
import expressWS from 'express-ws';
import cors from 'cors';
import {WebSocket} from 'ws';
import mongoose from "mongoose";
import config from "./config";
import UsersRouter from "./routers/Users";
import User from "./models/User";
import Message from "./models/Message";

const app = express();
expressWS(app);
const port = 8000;

app.use(express.json());
app.use(cors());
app.use('/users', UsersRouter);

const router = express.Router();

const connectedUsers: WebSocket[] = [];

interface messageFromUser {
    message: string;
}

interface IncomingMessage {
    type: string;
    payload: messageFromUser;
}

let messages: messageFromUser[] = [];

router.ws('/chat', (ws, req) => {
    connectedUsers.push(ws);
    console.log('Client connected. Clients total - ', connectedUsers.length);

    ws.on("message", async (message) => {
        try {
            const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

            if (decodedMessage.type === "LOGIN") {
                const user = await User.findOne({token: decodedMessage.payload});

                if (!user) {
                    ws.send(JSON.stringify({error: "Invalid token"}));
                    ws.close();
                    return;
                }

                const lastMessages = await Message.find().sort({ timestamp: -1 }).limit(30);

                ws.send(JSON.stringify({type: "MESSAGES_HISTORY", payload: lastMessages}));
                return;
            }

            if (decodedMessage.type === 'SEND_MESSAGE') {
                messages.push(decodedMessage.payload);


                connectedUsers.forEach((clientWS) => {
                    clientWS.send(JSON.stringify({
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
        connectedUsers.splice(index, 1);
        console.log('Users total - ', connectedUsers.length);
    });
});

app.use(router);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};

run().catch((err) => console.log(err));
