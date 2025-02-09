import { useAppSelector } from '../app/hooks.ts';
import { selectUser } from '../features/users/UsersSlice.ts';
import OnlineUsers from '../components/OnlineUsers/OnlineUsers.tsx';
import ChatForm from '../components/ChatForm/ChatForm.tsx';


const ChatPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex h-screen">

      <aside className="w-64 bg-gray-100 text-gray-900 p-4 shadow-lg flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Online Users</h2>

        {user && user.isOnline ? (
          <OnlineUsers/>
        ) : (
          <p className="text-center text-gray-400">No users online :(</p>
        )}
      </aside>

      <div className="flex-1 bg-white p-6 overflow-y-auto">

        <div className="border border-gray-300 rounded-md p-3 text-center">
          <h2 className="text-xl font-semibold">Chat Room</h2>

          <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-auto p-4">
              <div>messages</div>
            </div>
            <ChatForm/>
          </div>
        </div>
      </div>
    </div>
  )
    ;
};

export default ChatPage;
