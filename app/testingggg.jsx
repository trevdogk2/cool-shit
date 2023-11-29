"use client";

import React from "react";
import "./home.css";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = [ref1.current, ref2.current, ref3.current, ref4.current, ref5.current];

    const rotations = [360, 180, 0, -180, -360];

    const size = 19;
    // const translateY2 = `-${(size * scale2) / 2 - 0.5 * size}px`;

    const createAnimation = (element, index) => {
      return gsap.context(() => {
        // Set initial styles
        gsap.set(element, { width: `${size}vw` });

        // Scroll Trigger
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".aniTrigger",
            pin: `.logo${index}`,
            start: "top center",
            end: "+=640",
            scrub: true,
            toggleActions: "play pause resume none",
            pinSpacing: true,
          },
        });

        if (index === 2) {
          tl.to(element, { width: `${size + 5}vw` }, "100%"); // Intermediate state at 50% scroll
        } else {
          tl.to(element, { rotation: rotations[index] }, "100%"); // Intermediate state at 50% scroll
        }
      });
    };

    const contexts = elements.map((el, index) => createAnimation(el, index));

    return () => {
      contexts.forEach((ctx) => ctx.revert());
    };
  }, []);

  return (
    <div className="App">
      <div className="helper"></div>
      <div className="aniTrigger flex flex-row justify-between relative w-full" ref={containerRef}>
        <div className="logo0 w-[19vw] h-[19vw] bg-white" ref={ref1}></div>
        <div className="logo1 w-[19vw] h-[19vw] bg-white" ref={ref2}></div>
        <div className="logo2 w-[19vw] h-[19vw] bg-white" ref={ref3}></div>
        <div className="logo3 w-[19vw] h-[19vw] bg-white" ref={ref4}></div>
        <div className="logo4 w-[19vw] h-[19vw] bg-white" ref={ref5}></div>
      </div>

      <div className="helper mt-[580px]"></div>
    </div>
  );
};

export default Home;
