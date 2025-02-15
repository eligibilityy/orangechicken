"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import OrangeChicken from "@/assets/orangechicken.png";
import { FaGithub, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiLetterboxd } from "react-icons/si";
import SplitType from "split-type";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const nameSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!headingRef.current || !paragraphRef.current) return;

    const isFirstVisit = !sessionStorage.getItem("visited");
    const initialDelay = isFirstVisit ? 2.5 : 0.2;

    const heading = new SplitType(headingRef.current, { types: 'chars,words' });
    const paragraph = new SplitType(paragraphRef.current, { types: 'lines' });

    const ctx = gsap.context(() => {
      gsap.set([heading.chars, paragraph.lines, ".hero-link"], { 
        opacity: 0,
        y: 50 
      });

      gsap.set(hoverImageRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 45
      });

      const tl = gsap.timeline();

      // Animate heading characters
      tl.to(heading.chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "power4.out",
        delay: initialDelay,
      })
      .to(paragraph.lines, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.6")
      .to(".hero-link", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

      (gsap.utils.toArray(".hero-link") as HTMLElement[]).forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            y: -5,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Set up hover animation
      if (nameSpanRef.current && hoverImageRef.current) {
        nameSpanRef.current.addEventListener("mouseenter", () => {
          gsap.to(hoverImageRef.current, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "back.out(1.7)"
          });
        });

        nameSpanRef.current.addEventListener("mouseleave", () => {
          gsap.to(hoverImageRef.current, {
            opacity: 0,
            scale: 0,
            rotation: 45,
            duration: 0.2,
            ease: "power2.in"
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[70vh] flex items-center relative overflow-visible">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col space-y-6 z-10">
          <h1 ref={headingRef} className="text-5xl w-full sm:text-6xl font-bold leading-tight">
            Hey, I&apos;m <span ref={nameSpanRef} className="text-orange-500">Elijah</span>
          </h1>
          <p ref={paragraphRef} className="text-lg text-muted-foreground">
            An 11th Grade Student from De La Salle Lipa. I&apos;m into graphic design, 
            front-end development, and pixel art.
          </p>
          <div className="flex gap-4">
            <Link href="https://github.com/eligibilityy" className="hero-link hover:text-orange-500 transition-colors">
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link href="https://youtube.com/@eligibilityy" className="hero-link hover:text-orange-500 transition-colors">
              <FaYoutube className="w-6 h-6" />
            </Link>
            <Link href="https://instagram.com/eligibilityy" className="hero-link hover:text-orange-500 transition-colors">
              <FaInstagram className="w-6 h-6" />
            </Link>
            <Link href="https://letterboxd.com/eligibilityy" className="hero-link hover:text-orange-500 transition-colors">
              <SiLetterboxd className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      {/* Hover image */}
      <div ref={hoverImageRef} className="fixed left-[45%] top-[40%] w-[120px] aspect-square opacity-0 pointer-events-none origin-bottom-left">
        <Image
          src={OrangeChicken}
          alt="Orange Chicken"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
