"use client";

import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight } from "lucide-react";

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string;
}

const GithubRepos = ({ username }: { username: string }) => {
  const scrollRef = useRef(null);

  const { data, isLoading } = useQuery<Repository[]>({
    queryKey: ["githubRepos", username],
    queryFn: async () => {
      const repos = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      return repos.data;
    },
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (data) {
      gsap.set(".repo-card", {
        opacity: 0,
        y: 50,
      });

      gsap.to(".repo-card", {
        scrollTrigger: {
          trigger: scrollRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "restart none none reverse",
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Add hover animations
      (gsap.utils.toArray(".repo-card") as HTMLElement[]).forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
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
    }
  }, [data]);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-32 bg-muted/50 rounded-t-xl" />
            <CardContent className="space-y-2 p-6">
              <div className="h-4 w-3/4 bg-muted/50 rounded" />
              <div className="h-4 w-1/2 bg-muted/50 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );

  return (
    <div ref={scrollRef}>
      <h2 className="text-3xl font-bold">
        repos<span className="text-orange-500">,</span>
      </h2>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-card group"
          >
            <Card className="h-full transition-colors hover:bg-muted/50">
              <div className="absolute top-4 right-4 opacity-0 transform -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FaGithub className="w-5 h-5" />
                  {repo.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {repo.description || "No description provided"}
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <FaStar className="w-4 h-4" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch className="w-4 h-4" />
                    {repo.forks_count}
                  </span>
                  {repo.language && (
                    <span className="ml-auto">{repo.language}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GithubRepos;
