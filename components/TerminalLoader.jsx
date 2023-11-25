"use client";
import React, { useState, useRef, useEffect } from "react";
import "./TerminalLoader.css";
import { Kbd } from "@nextui-org/react";

const TerminalLoader = ({ isCracking, isExpanded, isUnlocked, setIsCracked, setIsCracking, setIsExpanded }) => {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const historyScrollRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    // Handle global keydown for Ctrl + `
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "`") {
        setIsExpanded(true);
      }
    };

    // Event listener to close terminal on click outside
    const handleClickOutside = (event) => {
      if (terminalRef.current && !terminalRef.current.contains(event.target)) {
        handleExit();
      }
    };

    // Add keydown event listener
    document.addEventListener("keydown", handleKeyDown);

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (historyScrollRef.current) {
      historyScrollRef.current.scrollTop = historyScrollRef.current.scrollHeight;
    }
  }, [history]);

  const formatDate = () => {
    const now = new Date();
    return now
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
      .replace(",", "");
  };

  const handleInputChange = (e) => {
    if (!isCracking) {
      setInputValue(e.target.value);
      e.target.value = "";
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      handleExit();
    }
  };

  const getResponse = (command) => {
    var commandLower = command.toLowerCase();
    let commandDictionary = {
      exit: "exit",
      help: "Nah, sorry bro",
      "get-command": "hellll nahhhhhhhh",
      clear: "clear",
    };
    if (commandDictionary[commandLower]) return commandDictionary[commandLower];
    else return `'${command}' is not recognized as an internal or external command, operable program or batch file.`;
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    if (!isCracking) {
      const last100 = history.slice(-100);
      setInputValue(""); // Clear the input field
      setHistory(() => [...last100, `C:\\Users\\TrevorWestin> ${inputValue.trim()}`]);
      if (inputValue.trim() != "") {
        const response = getResponse(inputValue.trim());
        if (response == "clear") setHistory([]);
        else if (response == "exit") setIsExpanded(false);
        else setHistory(() => [...last100, `C:\\Users\\TrevorWestin> ${inputValue.trim()}`, `${response}\n\n`]);
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [isExpanded]);

  const handleOpenTerminal = () => {
    if (!isCracking) {
      setIsExpanded(true);
      inputRef.current.focus();
    }
  };

  const handleExit = async () => {
    if (!isCracking) {
      setInputValue("");
      for (const char of "exit") {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setInputValue((prev) => prev + char); // Append one character at a time
      }
      setInputValue(""); // Clear the input for the next command
      setHistory((prevHistory) => [...prevHistory, `C:\\Users\\TrevorWestin> exit\n\n`]);
      setIsExpanded(false);
    }
  };

  const handleCloseTerminal = () => {
    if (!isCracking) {
      if (isExpanded) {
        handleExit();
      } else {
        setIsExpanded(true);
      }
    }
  };

  const timestamp = formatDate();

  const crackingSteps = [
    {
      command: "ping 192.168.1.1",
      output:
        "PING 192.168.1.1 (192.168.1.1): 56 data bytes\n64 bytes from 192.168.1.1: icmp_seq=0 ttl=64 time=0.080 ms",
    },
    {
      command: "nmap -sP 192.168.1.1/24",
      output:
        "Starting Nmap 7.70 ( https://nmap.org ) at 2023-03-29\nNmap scan report for 192.168.1.1\nHost is up (0.00080s latency).",
    },
    {
      command: "nc -vv -n -z -w 1 192.168.1.1 1-1024",
      output: "Connection to 192.168.1.1 22 port [tcp/ssh] succeeded!",
    },
    {
      command: "hydra -l admin -P password.txt 192.168.1.1 http-post-form -V",
      output:
        '[DATA] attacking ssh://rust-server.com:22 with login "PAIN DELIVERER" and password "rockAndTorch!90"\n[22][ssh] host: rust-server.com   login: PAIN DELIVERER   password: rockAndTorch!90\n[STATUS] attack finished for rust-server.com (valid password found)\n[80][http-post-form] host: 192.168.1.1   login: admin   password: 123456',
    },
    {
      command: 'sqlmap -u "http://192.168.1.1/login" --forms --batch --crawl=2',
      output: "sqlmap/1.2.3 - automatic SQL injection and database takeover tool\nhttps://sqlmap.org",
    },
    {
      command: "dir",
      output: ` Volume in drive C has no label.\n Volume Serial Number is ABCD-1234\n\n Directory of C:\\Users\\TrevorWestin\n\n${timestamp}    <DIR>          .\n${timestamp}    <DIR>          ..\n${timestamp}    <DIR>          Documents\n${timestamp}    <DIR>          Downloads\n${timestamp}    <DIR>          Desktop\n               5 File(s)     1,024,576 bytes\n               3 Dir(s)  100,024,576 bytes free`,
    },
    { command: "open_sesame.exe", output: "Admin privileges granted.\nWelcome, Trevor." },
  ];

  //Cracking in effect starts here
  useEffect(() => {
    // Function to simulate a cracking process
    const crack = async () => {
      setInputValue("");
      setIsExpanded(true);
      for (const step of crackingSteps) {
        //simulate typing the step by setting inputValue (setInputValue)
        for (const char of step.command) {
          setInputValue((prev) => prev + char); // Append one character at a time
          await new Promise((resolve) => setTimeout(resolve, 5)); // Delay between each character to simulate typing speed
        }
        setInputValue(""); // Clear the input for the next command
        setHistory((prevHistory) => [...prevHistory, `C:\\Users\\TrevorWestin> ${step.command}`]);
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate command execution time
        setHistory((prevHistory) => [...prevHistory, `${step.output}\n\n`]);
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      setIsExpanded(false);
      inputRef.current.focus();
      setIsCracked(true);
      setIsCracking(false);
    };

    if (isCracking) {
      crack();
    }

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(crack);
  }, [isCracking]);

  const terminalStyle = `transition-all fixed z-50 overflow-x-hidden bg-black border text-xs md:text-md lg:text-lg text-terminal font-mono flex justify-center items-center ${
    isExpanded
      ? "top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 h-5/6 w-5/6 retro-terminal opacity-90 rounded-bl-none"
      : "top-0 right-0 w-[123px] h-[42px] opacity-100 rounded-bl-md"
  } ${isUnlocked ? "border-black" : "border-white"}`;

  // h-5/6 md:h-2/3 w-5/6
  // h-[42px] w-[126px]
  const terminalContentStyle = `${
    !isExpanded && "hidden"
  } absolute w-full h-full left-0 top-0 p-2 overflow-x-hidden overflow-y-auto terminalScrollBar`;

  return (
    <div ref={terminalRef} className={terminalStyle}>
      <div className={`relative w-full h-full`} onClick={handleOpenTerminal}>
        <div ref={historyScrollRef} className={terminalContentStyle}>
          {history.map((line, index) => (
            <p key={index} style={{ whiteSpace: "pre-wrap" }}>
              {line}
            </p>
          ))}
          <form onSubmit={handleInputSubmit}>
            <div className="flex flex-row items-center">
              <p>{"C:\\Users\\TrevorWestin>"} </p>
              <p className="opacity-0">{"0"}</p>
              <div className=""> {inputValue}</div>
              <div className="customCaret">
                <p className="opacity-0">{"0"}</p>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="command-input"
                autoFocus
              />
            </div>
          </form>
        </div>
        {isExpanded && (
          <>
            <div className="flicker"></div>
            <div className="scanlines"></div>
            <div className="noise"></div>
          </>
        )}
      </div>
      <div className="hoverFlicker cursor-pointer">
        <div
          onClick={handleCloseTerminal}
          className={`absolute transition-all top-0 right-0 h-10 w-10 border-white z-10 bg-black flex justify-center items-center ${
            isExpanded && "border-b"
          }`}
        >
          <svg
            className={`w-full h-full text-white absolute ${isExpanded ? "opacity-100" : "opacity-0"}`}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 2C5.77614 2 6 2.22386 6 2.5V5.5C6 5.77614 5.77614 6 5.5 6H2.5C2.22386 6 2 5.77614 2 5.5C2 5.22386 2.22386 5 2.5 5H5V2.5C5 2.22386 5.22386 2 5.5 2ZM9.5 2C9.77614 2 10 2.22386 10 2.5V5H12.5C12.7761 5 13 5.22386 13 5.5C13 5.77614 12.7761 6 12.5 6H9.5C9.22386 6 9 5.77614 9 5.5V2.5C9 2.22386 9.22386 2 9.5 2ZM2 9.5C2 9.22386 2.22386 9 2.5 9H5.5C5.77614 9 6 9.22386 6 9.5V12.5C6 12.7761 5.77614 13 5.5 13C5.22386 13 5 12.7761 5 12.5V10H2.5C2.22386 10 2 9.77614 2 9.5ZM9 9.5C9 9.22386 9.22386 9 9.5 9H12.5C12.7761 9 13 9.22386 13 9.5C13 9.77614 12.7761 10 12.5 10H10V12.5C10 12.7761 9.77614 13 9.5 13C9.22386 13 9 12.7761 9 12.5V9.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className={`w-full h-full text-white ${isExpanded ? "opacity-0" : "opacity-100"}`}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <div
          onClick={handleCloseTerminal}
          className={`absolute top-0 right-10 w-20 h-10 z-10 bg-black text-sm flex justify-center items-center border-white overflow-hidden ${
            isExpanded && "border-b border-l"
          } `}
        >
          {isExpanded ? <Kbd keys={[]}>Esc</Kbd> : <Kbd keys={[]}>ctrl + `</Kbd>}
        </div>
      </div>
    </div>
  );
};

export default TerminalLoader;
