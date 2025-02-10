import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/UsersSlice.ts';
import OnlineUsers from '../components/OnlineUsers/OnlineUsers.tsx';
import Messages from '../components/Messages/Messages.tsx';
import ChatForm from '../components/ChatForm/ChatForm.tsx';

const ChatPage = () => {
  const user = useAppSelector(selectUser);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/chat');
    setWs(socket);

    socket.onclose = () => console.log('Disconnected from WebSocket');

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex h-screen w-screen-98vw overflow-hidden">
      <aside className="w-64 bg-gray-100 text-gray-900 p-4 shadow-lg flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Online Users</h2>
        {user && user.isOnline ? (
          <OnlineUsers />
        ) : (
          <p className="text-center text-gray-400">No users online :(</p>
        )}
      </aside>

      <div className="flex flex-col flex-1 h-full w-full overflow-hidden">
        <div className="border border-gray-300 rounded-md flex flex-col h-full w-full">
          <h2 className="text-xl font-semibold text-center p-3">Chat Room</h2>

          <div className="flex-1 overflow-y-auto px-4">
            <Messages ws={ws} />
          </div>

          <div className="p-3 w-full">
            <ChatForm ws={ws} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
