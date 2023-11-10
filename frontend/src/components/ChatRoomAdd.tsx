import io from "socket.io-client";
import { useEffect } from "react";
import ChatLive from "./ChatLive";

const socket = io("http://localhost:9000"); // Corrected the port number

interface ChatRoomAddProps {
  matchingId: string;
  username: string;
}

function ChatRoomAdd({ matchingId, username }: ChatRoomAddProps) {

  useEffect(() => {
    const joinRoom = () => {
      if (username !== "" && matchingId !== "") {
        socket.emit("join_room", matchingId);
      }
    };

    joinRoom(); // Automatically join the room when the component is mounted
  }, [matchingId, username]); // Include matchingId, username in the dependency array

  return (
    <div className="App">
      <ChatLive socket={socket} username={username} room={matchingId} />
    </div>
  );
}

export default ChatRoomAdd;
