import React, { useEffect, useState } from "react";
import "../components/css/chat.css";
import { db, firestore } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  where,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function Chat() {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [roomFull, setRoomFull] = useState(false);
  const navigate = useNavigate();
  const messagesRef = collection(db, "chat");
  const roomNo = JSON.parse(localStorage.getItem("myRoom"));

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", roomNo),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      let users = new Set();
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
        users.add(doc.data().name);
      });

      setData(messages);
      console.log(users.size);
      if (users.size > 100) {
        setRoomFull(true);
        alert("Room is full!");
      }
    });

    return () => unsubscribe();
  }, [roomNo, messagesRef]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && !roomFull) {
      try {
        const collectionRef = firestore.collection("chat");
        collectionRef.add({
          text: message,
          timestamp: new Date(),
          room: roomNo,
          name: JSON.parse(localStorage.getItem("myName")),
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setMessage("");
    }
  };

  if (roomFull) {
    navigate("/room");
    setRoomFull(false);
  }

  return (
    <div className="Chat">
      <div className="Scrolling-content">
        <div className="myMessages">
          {data.map((item) => {
            if (item.room === roomNo) {
              return (
                <div key={item.id} className="messages">
                  <span
                    style={{
                      color: "#FF52A2",
                      fontSize: "20px",
                      fontWeight: "bold",
                      fontFamily: "Mate SC",
                      textTransform: "capitalize",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.name}---- &nbsp;{" "}
                  </span>
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontSize: "18px",

                      fontFamily: "Dancing Script",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="type message here..."
            />
            <button type="submit">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
