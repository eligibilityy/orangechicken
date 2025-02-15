"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize any global GSAP animations
    const splitTypes = document.querySelectorAll("[data-split]");
    splitTypes.forEach((element) => {
      new SplitType(element as HTMLElement, {
        types: "chars,words",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <>{children}</>;
} 