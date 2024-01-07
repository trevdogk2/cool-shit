"use client";

import React from "react";
import "./home.css";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MovingPlaneScene from "@/components/threejs/MovingPlane";
import BlobScene from "@/components/threejs/Blob";
// import Atom from "@/components/threejs/Atom";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const square1 = useRef(null);
  const square2 = useRef(null);
  const square3 = useRef(null);
  const square4 = useRef(null);

  const box0 = useRef(null);
  const box1 = useRef(null);
  const box2 = useRef(null);
  const box3 = useRef(null);
  const box4 = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = [box1.current, box2.current, box3.current, box4.current];
    const squares = [square1.current, square2.current, square3.current, square4.current];

    // const rotations = [360, 180, 0, -180, -360];

    const createCardAnimation = (element, index) => {
      const Offsets = [36, 12, -12, -36];
      const centerXOffset = `${Offsets[index]}vw`;

      return gsap.context(() => {
        // Scroll Trigger
        gsap.fromTo(
          element,
          { x: 0 },
          {
            x: centerXOffset,
            scrollTrigger: {
              trigger: ".aniTrigger",
              start: "top top",
              end: "+=1500",
              scrub: true,
              toggleActions: "play pause resume none",
            },
          }
        );
      });
    };
    const createSquareAnimation = (element, index) => {
      const spins = [180, 112.5, -134, -382.5];
      const rotationDeg = `${spins[index]}`;
      const secondHalf =
        index == 0 ? { rotation: "270", width: "100vh", height: "100vw", opacity: 1, position: "fixed" } : {};

      return gsap.context(() => {
        // Scroll Trigger
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".aniTrigger",
            start: "top top",
            end: "+=3000",
            pin: `.box${index + 1}`,
            pinSpacing: true,
            scrub: true,
            toggleActions: "play pause resume none",
          },
        });

        tl.to(element, { rotation: rotationDeg }, "90%").to(element, secondHalf, "100%");
      });
    };
    // const createTransitionAnimation = (element) => {
    //   return gsap.context(() => {
    //     gsap.fromTo(
    //       element,
    //       { position: "block", rotation: 0, width: "10vw", height: "10vw" },
    //       {
    //         position: "fixed",
    //         rotation: 90,
    //         width: "100vh",
    //         height: "100vw",
    //         opacity: 1,
    //         zIndex: 40,
    //         scrollTrigger: {
    //           trigger: ".aniTrigger",
    //           start: "70% 100%", // Start when the bottom of .aniTrigger hits the bottom of the viewport
    //           end: "70% 0%", // Same as start for a one-time trigger
    //           scrub: 1, // Play the animation independently of the scroll once triggered
    //           toggleActions: "play pause resume none", // Play once when the trigger is reached
    //           ease: "expo.inOut",
    //         },
    //       }
    //     );
    //   });
    // };
    const contexts = cards.map((el, index) => createCardAnimation(el, index));
    const context2s = squares.map((el, index) => createSquareAnimation(el, index));
    // const transition = createTransitionAnimation(square1.current);

    return () => {
      // [...contexts, ...context2s, transition].forEach((ctx) => ctx.revert());
      [...contexts, ...context2s].forEach((ctx) => ctx.revert());
    };
  }, []);

  return (
    <div className="App">
      <div className="w-full h-[100vh] flex justify-center items-center pattern5">
        <div className="w-[50vh] h-[50vh] shadow-2xl bg-white">
          {/* <Atom primaryColor="#000000" secondaryColor="#000000" lineColor="#61dbfb" /> */}
          {/* <MovingPlaneScene /> */}
          <BlobScene />
        </div>
      </div>

      <div className="h-[8vw] bg-black"></div>
      <div className="z-10 aniTrigger flex flex-row justify-evenly relative w-full py-[4vw]" ref={containerRef}>
        <div
          className="z-[40] relative box1 w-[20vw] border border-white flex justify-center items-center"
          ref={box1}
          style={{ height: "calc(100vh - 8vw)" }}
        >
          <div className="square w-[10vw] h-[10vw] bg-white" ref={square1}></div>
        </div>
        <div
          className="z-30 box2 w-[20vw] border border-white flex justify-center items-center"
          ref={box2}
          style={{ height: "calc(100vh - 8vw)" }}
        >
          <div className="square w-[10vw] h-[10vw] bg-gray-400" ref={square2}></div>
        </div>
        <div
          className="z-20 box3 w-[20vw] border border-white flex justify-center items-center"
          ref={box3}
          style={{ height: "calc(100vh - 8vw)" }}
        >
          <div className="square w-[10vw] h-[10vw] bg-gray-600" ref={square3}></div>
        </div>
        <div
          className=" z-10 box4 w-[20vw] border border-white flex justify-center items-center"
          ref={box4}
          style={{ height: "calc(100vh - 8vw)" }}
        >
          <div className="square w-[10vw] h-[10vw] bg-gray-800" ref={square4}></div>
        </div>

        {/* <div className="fixed -z-[10] w-[1vw] h-[1vw] bg-red-500 bottom-[50vw] box0" ref={box0}></div> */}
      </div>

      {/* New Section that i want to cover up the div before */}
      <div className="relative z-50">
        <div className="absolute w-full min-h-screen -top-[100vh] flex flex-col text-black">
          <div className="bg-transparent min-h-screen w-full grid grid-rows-3 grid-cols-3">
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
            <p>HELLO WORLD</p>
          </div>
          <div className="bg-blue-500 h-screen w-full text-black"></div>
          <div className="bg-green-500 h-screen w-full text-black"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
