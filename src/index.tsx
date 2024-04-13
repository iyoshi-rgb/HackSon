import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/views/login";
import { Signup } from "./pages/views/signup";
import { Roomlist } from "./pages/views/roomlist";
import { Profile } from "./pages/views/profile";
import { Chat } from "./pages/views/chat";
import { Makeroom } from "./pages/views/makeroom";
import { Header } from "./layouts/Header";
import { Room } from "./pages/views/room";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="makeroom" element={<Makeroom />} />
        <Route path="/room" element={<Room />} />
        <Route path="/roomlist" element={<Roomlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
