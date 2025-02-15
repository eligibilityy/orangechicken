"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import gsap from "gsap";

const PageTransition = () => {
  const pathname = usePathname();

  useEffect(() => {
    const isFirstVisit = !sessionStorage.getItem("visited");
    if (isFirstVisit) return;

    // Create timeline for page transitions
    const tl = gsap.timeline();

    // Fade out current content
    tl.to("[data-page-content]", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.1,
    })
    // Fade in new content
    .fromTo("[data-page-content]", 
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        clearProps: "all"
      }
    );

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return null;
};

export default PageTransition; 