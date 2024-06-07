import React from "react";

// import Left from "./Left";
import Sidebar from "./Sidebar";
import Private from "./Private";
import { LoginWithNavigation } from "../pages/Login";
import Home from "../pages/Home";

import { Routes, Route } from "react-router-dom";

import Room from "../pages/Room";
import Chat from "../pages/Chat";

function App() {
  return (
    <div className="App">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginWithNavigation />} />
        <Route element={<Private />}>
          <Route path="/room" element={<Room />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
