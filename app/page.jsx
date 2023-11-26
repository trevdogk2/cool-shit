"use client";

import React from "react";
import "./home.css";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  useEffect(() => {
    const elements = [ref1.current, ref2.current, ref3.current, ref4.current, ref5.current];
    // const rotations = [-15, -30, 0, 30, 15];
    const rotations1 = [0, 0, 0, 0, 0];
    const rotations2 = [180, 180, 0, 180, 180];

    const size = 80;
    const scale2 = 8;
    const translateY2 = `-${(size * scale2) / 2 - 0.5 * size}px`;
    const positions1 = [
      `-${2 * size + size / 2}px`,
      `-${size + size / 2}px`,
      `-${size / 2}px`,
      `${size / 2}px`,
      `${size + size / 2}px`,
    ];
    const positions2 = [`-${size / 2}px`, `-${size / 2}px`, `${0}px`, `-${size / 2}px`, `-${size / 2}px`];

    const createAnimation = (element, index) => {
      return gsap.context(() => {
        // Set initial styles
        gsap.set(element, { rotation: rotations1[index], x: positions1[index] });

        // Scroll Trigger
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".aniTrigger",
            pin: `.logo${index + 1}`,
            start: "center center",
            end: "+=640",
            scrub: true,
            toggleActions: "play pause resume reset",
            pinSpacing: true,
          },
        });

        if (index === 2) {
          tl.to(element, { rotation: rotations2[index], x: positions2[index] }, "50%") // Intermediate state at 50% scroll
            .to(element, { scale: scale2, y: translateY2, rotation: 180, zIndex: 50 }, "100%"); // Final state at 100% scroll
        } else {
          tl.to(element, { rotation: rotations2[index], x: positions2[index] }, "50%") // Intermediate state at 50% scroll
            .to(element, {}, "100%"); // Final state at 100% scroll
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
      <div className="aniTrigger relative w-full">
        <div className="absolute left-[50%] logo1 w-[80px] h-[80px] bg-yellow-500" ref={ref1}></div>
        <div className="absolute left-[50%] logo2 w-[80px] h-[80px] bg-orange-500" ref={ref2}></div>
        <div className="absolute left-[50%] -translate-x-1/2 logo3 w-[80px] h-[80px] bg-red-500" ref={ref3}></div>
        <div className="absolute left-[50%] logo4 w-[80px] h-[80px] bg-pink-500" ref={ref4}></div>
        <div className="absolute left-[50%] logo5 w-[80px] h-[80px] bg-purple-500" ref={ref5}></div>
      </div>

      <div className="helper mt-[580px]"></div>
    </div>
  );
};

export default Home;
