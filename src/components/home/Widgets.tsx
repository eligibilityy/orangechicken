"use client";

import React from "react";
import { Section } from "@/components/craft";
import Discord from "./Discord";
import Weather from "./Weather";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";

const Widgets = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([".info-title", ".info-separator", ".info-card"], {
        opacity: 0,
        y: 20,
      });

      gsap.set(".info-separator", {
        scaleX: 0,
        transformOrigin: "left center"
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom center",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });

      tl.to(".info-title", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power4.out",
      })
        .to(".info-separator", {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: "power3.inOut",
        }, "-=0.4")
        .to(".info-card", {
          opacity: 1,
          y: 0,
          stagger: {
            amount: 0.4,
            ease: "power3.out"
          },
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.2");
    }, containerRef); // Scope GSAP context to container

    return () => ctx.revert(); // Cleanup
  }, []); // Empty dependency array since we only want to run once

  return (
    <Section data-page-content className="py-24 sm:py-32">
      <div ref={containerRef}>
        <h2 className="info-title text-3xl sm:text-4xl font-semibold tracking-tight">
          info<span className="text-orange-500">,</span>
        </h2>
        <Separator className="my-4" />

        <div className="flex flex-col gap-6">
          <div className="info-card transform transition-transform hover:scale-[1.02]">
            <Weather />
          </div>
          <div className="info-card transform transition-transform hover:scale-[1.02]">
            <Discord />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Widgets;
