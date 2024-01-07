"use client";
import React, { useEffect } from "react";

const ConsoleArt = () => {
  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      // Display console art
      //   console.log("%cWelcome, Developer!", "font-size: 16px; color: green;");
      console.log(
        `%c
      ░  ░░░░  ░        ░  ░░░░░░░░      ░░░      ░░  ░░░░  ░        ░
      ▒  ▒  ▒  ▒  ▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒  ▒▒▒▒  ▒  ▒▒▒▒  ▒   ▒▒   ▒  ▒▒▒▒▒▒▒
      ▓        ▓      ▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓  ▓        ▓      ▓▓▓
      █   ██   █  ███████  ███████  ████  █  ████  █  █  █  █  ███████
      █  ████  █        █        ██      ███      ██  ████  █        █\n
      
      ░       ░░        ░  ░░░░  ░        ░  ░░░░░░░░      ░░       ░░        ░       ░░
      ▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒  ▒▒▒▒▒▒▒  ▒▒▒▒  ▒  ▒▒▒▒  ▒  ▒▒▒▒▒▒▒  ▒▒▒▒  ▒
      ▓  ▓▓▓▓  ▓      ▓▓▓▓  ▓▓  ▓▓      ▓▓▓  ▓▓▓▓▓▓▓  ▓▓▓▓  ▓       ▓▓      ▓▓▓       ▓▓
      █  ████  █  █████████    ███  ███████  ███████  ████  █  ███████  ███████  ███  ██
      █       ██        ████  ████        █        ██      ██  ███████        █  ████  █
                                                                                        
                                                                      `,
        "font-size: 16px; color: purple;"
      );
    }
  }, []);

  return null; // This component does not render anything
};

export default ConsoleArt;
