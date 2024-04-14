import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/views/login";
import { Roomlist } from "./pages/views/roomlist";
import { Profile } from "./pages/views/profile";
import { Chat } from "./pages/views/chat";
import { Makeroom } from "./pages/views/makeroom";
import { Header } from "./layouts/Header";
import { Room } from "./pages/views/room";
import { MyRoomList } from "./pages/views/myRooms";
// import { UserIdContext } from "./hooks/UserIdProvider";
import { UserProvider } from "./hooks/UserProvider";
import { LocationProvider } from "./hooks/LocationProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserProvider>
      <LocationProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="makeroom" element={<Makeroom />} />
            <Route path="/room" element={<Room />} />
            <Route path="/myRooms" element={<MyRoomList />} />
            <Route path="/roomlist" element={<Roomlist />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Router>
      </LocationProvider>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
