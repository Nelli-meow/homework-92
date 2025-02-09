import React, { useCallback, useState } from 'react';

const initialState = {
  text: ''
};

const ChatForm = () => {
  const [message, setMessage] = useState(initialState);

  const onSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message) {
      alert('You cant send a empty message!');
      return;
    }

    console.log(message);

    setMessage(initialState);
  };

  const inputChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setMessage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return (

    <form onSubmit={onSubmitMessage}>
      <div className="flex items-center gap-2 p-4 border-t bg-gray-100">
        <input
          value={message.text}
          name="text"
          type="text"
          onChange={inputChangeHandler}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </form>
  )
    ;
};

export default ChatForm;
