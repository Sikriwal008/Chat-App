import './App.css';
import socketIo from "socket.io-client";
import Join from "./components/Join/Join.js";
import Chat from "./components/Chat/Chat.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ENDPOINT = 'http://localhost:4500/';
const socket = socketIo(ENDPOINT, { transport: ['websocket'] });
function App() {
  socket.on("connect", () => {
    console.log("New Connection");
  })
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Join />}></Route>
        <Route exact path="/chat" element={<Chat />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
