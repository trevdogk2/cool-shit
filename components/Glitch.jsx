import useInterval from "@/app/customHooks/useInterval";
import "./Glitch.css";
import React, { useState, useEffect } from "react";

export default function Glitch({ text, isSolved }) {
  const [glitch, setGlitch] = useState("!@#$%^&");

  useEffect(() => {
    initRandomString(text?.length);
  }, [text]);

  useInterval(
    () => {
      changeRandomChar(isSolved);
    },
    glitch === text ? null : 10
  );

  const randomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()1234567890/?{}[]-+=_,.<>;:| ";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const changeRandomChar = (solve) => {
    const index = Math.floor(Math.random() * text.length);
    if (solve && Math.random() > 0.2) {
      setGlitch((prev) => prev.substring(0, index) + text.charAt(index) + prev.substring(index + 1));
    } else setGlitch((prev) => prev.substring(0, index) + randomChar() + prev.substring(index + 1));
  };

  const initRandomString = (length) => {
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += randomChar();
    }
    setGlitch(randomString);
  };

  return (
    <h1 className="glitch font-mono text-[1.5rem] md:text-[4rem]">
      <span aria-hidden="true">{glitch}</span>
      {glitch}
      <span aria-hidden="true">{glitch}</span>
    </h1>
  );
}
