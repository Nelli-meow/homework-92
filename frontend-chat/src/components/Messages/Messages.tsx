import { useEffect, useRef, useState } from 'react';

interface MessageFromUser {
  username: string;
  message: string;
}

interface IncomingMessage {
  type: string;
  payload: MessageFromUser | MessageFromUser[];
}

const Messages = () => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<MessageFromUser[]>([]);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');

    ws.current.onopen = () => console.log('Connected to WebSocket');

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data) as IncomingMessage;

      if (decodedMessage.type === 'MESSAGES_HISTORY') {
        const messagesHistory = Array.isArray(decodedMessage.payload)
          ? decodedMessage.payload
          : [decodedMessage.payload];

        setMessages(messagesHistory);
      } else if (decodedMessage.type === 'NEW_MESSAGE') {
        const newMessages = Array.isArray(decodedMessage.payload)
          ? decodedMessage.payload
          : [decodedMessage.payload];

        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
      }
    };

    ws.current.onclose = () => console.log('Disconnected from WebSocket');

    return () => {
      ws.current?.close();
    };
  }, []);

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
