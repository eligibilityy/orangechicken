"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
import OrangeChicken from "@/assets/orangechicken.png";
import SplitType from "split-type";

const Preloader = () => {
  const pathname = usePathname();
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem("visited");
    
    if (!isFirstVisit && pathname !== "/") {
      gsap.set(preloaderRef.current, { display: "none" });
      return;
    }

    if (!textRef.current) return;
    const text = new SplitType(textRef.current, { types: 'chars' });
    
    const tl = gsap.timeline();
    
    // Initial state
    gsap.set([contentRef.current, text.chars], { opacity: 0 });
    gsap.set(text.chars, { y: 50 });

    // Animate in
    tl.to(contentRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(text.chars, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power4.out"
    }, "-=0.3")
    .to(".preloader-logo", {
      y: -20,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    }, "-=0.5");

    // Check if resources are loaded
    Promise.all([
      document.fonts.ready,
      new Promise<void>(resolve => {
        if (document.readyState === "complete") {
          resolve();
        } else {
          window.addEventListener("load", () => resolve(), { once: true });
        }
      }),
      ...Array.from(document.images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    ]).then(() => {
      // Animate out
      tl.to([contentRef.current, text.chars], {
        opacity: 0,
        y: -30,
        duration: 0.4,
        stagger: 0.02,
        ease: "power2.in"
      })
      .to(preloaderRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          sessionStorage.setItem("visited", "true");
          gsap.set(preloaderRef.current, { display: "none" });
        }
      });
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div ref={contentRef} className="flex flex-col items-center">
        <div className="preloader-logo relative h-32 w-32 mb-8">
          <Image
            src={OrangeChicken}
            alt="Orange Chicken"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 ref={textRef} className="text-4xl font-bold mb-4">
          <span className="text-orange-500">orange</span>chicken
        </h1>
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader; 