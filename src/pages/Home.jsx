import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import "../components/css/home.css";
import Image from "../components/images/Image.png";

function Home() {
  const text = useRef(null);
  const text2 = useRef(null);

  const auth = localStorage.getItem("myItem");
  useEffect(() => {
    if (!auth) {
      new Typed(text.current, {
        strings: ["Welcome to Chatting", "Please Login to Chat"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true,
      });
    }
    if (auth) {
      new Typed(text2.current, {
        strings: ["Welcome to Chatting", "Find Room for Chat"],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true,
      });
    }
  }, [auth]);
  return (
    <div className="Home">
      <img src={Image} alt="" />
      {auth ? <span ref={text2}></span> : <span ref={text}></span>}
    </div>
  );
}

export default Home;
