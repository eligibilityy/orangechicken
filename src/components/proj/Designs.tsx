"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { imageList } from "@/generated/image-list";

gsap.registerPlugin(ScrollTrigger);

const Designs = () => {
  const [index, setIndex] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    const delay = 0.8; // Match page transition duration

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(".design-card", { opacity: 0, y: 50 });

      gsap.to(".design-card", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: delay + 0.4,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageList.map((src: string, idx: number) => (
          <div
            key={src}
            className="design-card relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            onClick={() => setIndex(idx)}
          >
            <Image
              src={src}
              alt={`Design ${idx + 1}`}
              fill
              className="object-cover transition-transform hover:scale-110"
            />
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={imageList.map((src: string) => ({ src }))}
      />
    </div>
  );
};

export default Designs; 