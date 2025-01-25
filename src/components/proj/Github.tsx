"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown, CalendarDays } from "lucide-react";
import { Container, Section } from "@/components/craft";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  created_at: string;
}

const fetchRepositories = async (username: string): Promise<Repository[]> => {
  const { data } = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  return data;
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

interface GitHubReposProps {
  username: string;
}

const GithubRepos: React.FC<GitHubReposProps> = ({ username }) => {
  const { data, isLoading, isError, error } = useQuery<Repository[]>({
    queryKey: ["githubRepos", username],
    queryFn: () => fetchRepositories(username),
    enabled: !!username,
  });

  const [visibleCount, setVisibleCount] = useState(3);

  if (isLoading)
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    );

  if (isError) {
    console.error(error);
    return <p>Failed to fetch repositories. Please try again later.</p>;
  }

  const handleSeeMore = () => {
    setVisibleCount(data?.length || 0);
  };

  const handleSeeLess = () => {
    setVisibleCount(3);
  };

  return (
    <Section>
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          public repos<span className="text-orange-500">,</span>
        </h1>
        <Separator className="my-4" />
        <Container className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.slice(0, visibleCount).map((repo) => (
            <HoverCard key={repo.id}>
              <HoverCardTrigger asChild>
                <Button
                  asChild
                  className="group flex items-center text-lg decoration-1 p-0 text-muted-foreground"
                  variant="link"
                >
                  <Link
                    className="transition-all underline underline-offset-[6px] hover:text-orange-500 decoration-1"
                    href={repo.html_url}
                  >
                    <span>{repo.name}</span>
                  </Link>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 border-muted-foreground/20 backdrop-blur-sm">
                <div className="flex flex-col space-y-1">
                  <h4 className="text-sm font-semibold ">{repo.name}</h4>
                  <p className="text-sm text-muted-foreground/90">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Created {formatDate(repo.created_at)}
                    </span>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </Container>

        {data && data.length > 6 && (
          <div className="mt-4 text-center">
            <Button
              onClick={visibleCount > 6 ? handleSeeLess : handleSeeMore}
              variant="default"
            >
              {visibleCount > 6 ? "See less" : "See more"}{" "}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-300 
                ${visibleCount > 6 ? "rotate-180" : ""}`}
                strokeWidth="2.5px"
              />
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default GithubRepos;
