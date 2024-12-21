import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:8080");

const Room = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    if (!room.trim()) {
      setMessage("Enter room id to join");
      return;
    }
    socket.emit("join-room", room);
  };

  const createRoom = () => {
    const newRoom: string = uuidv4();
    setRoom(newRoom);
    socket.emit("create-room", newRoom);
  };

  // Listen for room status messages from the server
  useEffect(() => {
    socket.on(
      "room-status",
      ({ room, message }: { room: string; message: string }) => {
        setMessage(message);

        if (
          message.includes("created") ||
          message.includes("joined") ||
          message.includes("existing")
        ) {
          setTimeout(() => navigate(`/editor/${room}`), 2000);
        }
      }
    );

    return () => {
      socket.off("room-status");
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Enter / Create Room Name To Start Code Collaboration
      </h1>
      <input
        type="text"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder="Room name"
        className="mt-1 px-3 mb-4 py-2 border border-white bg-[#0d0c26] text-white rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-left"
      />
      <div className="flex space-x-4">
        <button
          onClick={joinRoom}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Join Room
        </button>
        <button
          onClick={createRoom}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Room
        </button>
      </div>
      {message && <p className="mt-4 text-blue-500">{message}</p>}
    </div>
  );
};

export default Room;
