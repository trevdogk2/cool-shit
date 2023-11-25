import React, { useEffect, useRef } from "react";
import "./HexGrid.css";

export default function HexGrid({ isCracked, gridFlicker }) {
  const lightRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (lightRef.current) {
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Create grid squares
  const gridSquares = Array.from({ length: 100 }, (_, index) => (
    <div
      key={index}
      className={`bg-black ${gridFlicker ? "flickerOut" : ""}`}
      //   ${index > 9 && "hover:bg-[#0f222d]"}
      style={{ animationDelay: `${isCracked ? Math.random() * index * 30 : 0}ms` }}
      //   Max of 3 seconds and then 0.3 second animation (total 3.3 seconds)
    ></div>
  ));

  return (
    <div className="absolute top-0 left-0 z-30 flex justify-center items-center w-full h-screen">
      <div className="tileContainer relative top-0 left-0 w-full h-screen">{gridSquares}</div>
      <div ref={lightRef} className={`hidden md:flex hexLight ${gridFlicker ? "flickerOut" : ""}`}></div>
    </div>
  );
}
