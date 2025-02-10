import React, { useEffect, useState } from 'react';

interface MessageFromUser {
  username: string;
  message: string;
}

interface IncomingMessage {
  type: string;
  payload: MessageFromUser | MessageFromUser[];
}

interface MessagesProps {
  ws: WebSocket | null;
}

const Messages: React.FC<MessagesProps> = ({ ws }) => {
  const [messages, setMessages] = useState<MessageFromUser[]>([]);

  useEffect(() => {
    if (!ws) return;

    ws.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingMessage;


      if (decodedMessage.type === 'MESSAGES_HISTORY') {
        setMessages(Array.isArray(decodedMessage.payload) ? decodedMessage.payload : [decodedMessage.payload]);
      } else if (decodedMessage.type === 'NEW_MESSAGE') {
        setMessages((prev) => [...prev, ...(Array.isArray(decodedMessage.payload) ? decodedMessage.payload : [decodedMessage.payload])]);
      }
    };

    return () => {
      ws.onmessage = null;
    };
  }, [ws]);

  return (
    <div className="flex-1 overflow-auto p-4">
      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <div key={index} className="p-4 flex items-center border rounded-lg mb-4 border-purple-300">
            <strong className="text-2xl mr-2">{msg.username}:</strong>
            <span>{msg.message}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center">No messages yet :(</p>
      )}
    </div>
  );
};

export default Messages;
