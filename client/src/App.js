import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {!showChat ? (
        <div className="p-8 bg-white shadow-lg rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Join a Chat</h3>
          <input
            className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="John..."
          />
          <input
            className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="room id"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={joinRoom}
          >
            join a Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
}

export default App;
