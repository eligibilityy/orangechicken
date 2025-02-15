"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ModeToggle from "./theme";
import gsap from "gsap";

const Nav = () => {
  const navRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    // Only run animation if component hasn't been mounted before
    if (mountedRef.current) return;
    mountedRef.current = true;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([navRef.current, ".nav-link", ".nav-theme-toggle"], { 
        y: -20, 
        opacity: 0 
      });

      const tl = gsap.timeline();

      tl.to(navRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      })
      .to(".nav-link", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3")
      .to(".nav-theme-toggle", {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.2");

      // Add hover animations
      gsap.utils.toArray(".nav-link-hover").forEach((link: any) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            y: -2,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} data-page-content className="flex items-center justify-between py-4">
      <Link href="/" className="nav-link font-semibold text-4xl sm:text-6xl">
        yiliya<span className="text-orange-500">.</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/" className="nav-link nav-link-hover text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-orange-500">/</span>home
        </Link>
        <Link href="/projects" className="nav-link nav-link-hover text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-orange-500">/</span>projects
        </Link>
        <div className="nav-theme-toggle">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
