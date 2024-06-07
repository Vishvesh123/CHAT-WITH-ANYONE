import React, { useState } from "react";
import "../components/css/room.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Room() {
  const [roomNo, setRoomNo] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const isValidRoomNumber = (room) => {
    const roomNumberRegex = /^[0-9]{4}$/;
    return roomNumberRegex.test(room);
  };

  const isValidName = (name) => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const handleRoomNoChange = (e) => {
    setRoomNo(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = () => {
    if (!isValidRoomNumber(roomNo)) {
      toast.error("Room Number is not valid!");
      toast.info(" Enter 4 digit room number.");
      return;
    }
    if (!isValidName(name)) {
      toast.error("Name is not valid!");
      toast.info("Enter only characters from a to z.");
      return;
    }
    if (roomNo && name) {
      localStorage.setItem("myRoom", JSON.stringify(roomNo));
      localStorage.setItem("myName", JSON.stringify(name));
      navigate("/chat");
    } else {
      toast.info("Enter all the values");
    }
  };

  return (
    <div className="Room">
      <div className="roomInside">
        <input
          type="number"
          alt="room"
          maxLength="6"
          value={roomNo}
          name="room"
          placeholder="Enter room no"
          onChange={handleRoomNoChange}
          required
        />
        <input
          type="text"
          alt="name"
          placeholder="Enter your name"
          value={name}
          name="Myname"
          onChange={handleNameChange}
          required
        />

        <button type="submit" onClick={handleClick}>
          Chat
        </button>
      </div>
    </div>
  );
}

export default Room;
