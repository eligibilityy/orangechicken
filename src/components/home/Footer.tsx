"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";
import { Github, Drumstick, Youtube, Instagram } from "lucide-react";
import { Section } from "../craft";
import { FilmReel } from "@phosphor-icons/react/dist/ssr";
import gsap from "gsap";

const Footer = () => {
  const footerRef = useRef(null);
  const drumstickRef = useRef(null);

  useEffect(() => {

    const ctx = gsap.context(() => {
      gsap.set(footerRef.current, { 
        opacity: 0, 
        y: 20 
      });

      const tl = gsap.timeline();

      tl.to(footerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.2");
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <footer ref={footerRef} className="pb-8 text-center text-sm">
        <Section>
          <div className="not-prose flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-4">
              <h3 className="sr-only">yiliya</h3>
              <h1 className="footer-title text-3xl sm:text-5xl font-semibold tracking-tight">
                <span className="text-orange-500">orange</span>chicken
              </h1>
              <Drumstick ref={drumstickRef} className="scale-110 sm:scale-150 mt-2" />
            </Link>
            <p className="footer-text text-base text-left text-muted-foreground">
              <Balancer>
                I just really, really, really love orange chicken.
              </Balancer>
            </p>
          </div>
        </Section>
        <Section className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
          <div className="flex gap-2">
            {[
              { icon: <Github />, href: "https://github.com/eligibilityy" },
              { icon: <Youtube />, href: "https://youtube.com/@yiliyaliya" },
              { icon: <FilmReel />, href: "https://letterboxd.com/iyaiya/" },
              { icon: <Instagram />, href: "https://instagram.com/yiliya_liya/" }
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="footer-social flex items-center"
              >
                <Button variant="outline" size="icon">
                  {social.icon}
                </Button>
              </Link>
            ))}
          </div>
          <p className="footer-copyright text-left text-muted-foreground">
            &copy; <a href="https://github.com/eligibilityy">yiliya</a> 2025.
          </p>
        </Section>
      </footer>
    </>
  );
};

export default Footer;
