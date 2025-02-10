import React, { useCallback, useEffect, useRef, useState } from 'react';
import { selectUser } from '../../features/users/UsersSlice.ts';
import { useAppSelector } from '../../app/hooks.ts';

const ChatForm = () => {
  const ws = useRef<WebSocket | null>(null);
  const user = useAppSelector(selectUser);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');

    ws.current.onopen = () => console.log('Connected to WebSocket');
    ws.current.onclose = () => console.log('Disconnected from WebSocket');

    return () => {
      ws.current?.close();
    };
  }, []);

  const changeMessage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ws.current || messageText.trim() === '' || !user) return;

    ws.current.send(JSON.stringify({
      type: 'SEND_MESSAGE',
      payload: {
        username: user.displayName || user.username,
        message: messageText
      }
    }));

    setMessageText('');
  };

  return (
    <div className="p-4 border-t bg-gray-100">
      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          value={messageText}
          onChange={changeMessage}
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatForm;