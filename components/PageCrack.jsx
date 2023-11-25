"use client";
import React, { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import TerminalLoader from "./TerminalLoader";
import Welcome from "./Welcome";

const PageCrack = ({ children }) => {
  const [isCracked, setIsCracked] = useState(false);
  const [isCracking, setIsCracking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [gridFlicker, setGridFlicker] = useState(false);

  const handleUnlock = async () => {
    setGridFlicker(true);
    await new Promise((resolve) => setTimeout(resolve, 3500));
    setIsUnlocked(true);
  };

  const handleCrack = async () => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsCracking(true);
  };

  return (
    <NextUIProvider>
      <TerminalLoader
        isCracking={isCracking}
        isExpanded={isExpanded}
        isUnlocked={isUnlocked}
        setIsCracked={setIsCracked}
        setIsCracking={setIsCracking}
        setIsExpanded={setIsExpanded}
      />

      {/* Buttons and Glitch Text */}
      {!isUnlocked && (
        <Welcome
          isCracked={isCracked}
          gridFlicker={gridFlicker}
          handleCrack={handleCrack}
          handleUnlock={handleUnlock}
        />
      )}

      {/* Grid Overlay and Children */}
      <div className={`relative z-0 bg-white w-full ${isUnlocked ? "min-h-screen" : "h-screen overflow-hidden"}`}>
        {children}
      </div>
    </NextUIProvider>
  );
};

export default PageCrack;
