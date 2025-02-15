"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import gsap from "gsap";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, ArrowUpRight } from "lucide-react";

const Projects = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([".project-title", ".project-separator", ".project-card"], {
        opacity: 0,
        y: 30,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "restart none none reverse",
        },
      });

      tl.to(".project-title", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          ".project-separator",
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(".project-card", {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
        });

      (gsap.utils.toArray(".project-card") as HTMLElement[]).forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scrollRef}>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="https://dlsl-aces.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card group"
        >
          <Card className="h-full transition-colors hover:bg-muted/50 relative">
            <div className="absolute top-4 right-4 opacity-0 transform -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                DLSL ACES
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                A website for the ACES club in DLSL. Written in Typescript with
                Next.js, TailwindCSS.
              </p>
            </CardHeader>
          </Card>
        </Link>
        <Link
          href="https://tala.yiliya.me"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card group"
        >
          <Card className="h-full transition-colors hover:bg-muted/50 relative">
            <div className="absolute top-4 right-4 opacity-0 transform -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Tala Lasalyano
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                My second genuine project after ACES. Anonymous letter posting. Nextjs + Supabase.
              </p>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
