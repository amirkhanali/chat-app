import React, { useEffect, useState } from "react";

const Chat = ({ socket, room, userName }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageList]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-600 text-white text-center py-4 shadow-md">
        <p className="text-xl font-bold">Live Chat</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messageList.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-md ${
              userName === message.author
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-800"
            }  max-w-xs`}
          >
            <div>
              <div>
                <p className="text-sm break-words">{message.message}</p>
              </div>
              <div className="text-xs text-right mt-1">
                <p>{message.time}</p>
                <p className="italic">{message.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center h-40 bg-white shadow-md">
        <input
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Hey..."
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
