import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { v4 } from "uuid";

function App() {
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.emit("addUser", v4());
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [socket]);

  // On send message ...
  socket.current.emit("sendMessage", {
    senderId: "Current User ID",
    ReceiverId: "Receiver ID",
    text: "Text Of message",
  });
  // Data base update logic
  // On Receive Message....
  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  });
  // Database Update logic
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
