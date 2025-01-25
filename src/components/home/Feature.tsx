import Link from "next/link";

import Balancer from "react-wrap-balancer";

import { Button } from "@/components/ui/button";

import { Section, Container } from "@/components/craft";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "../ui/separator";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

const ACES = () => {
  return (
    <Section>
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          cooking<span className="text-orange-500">,</span>
        </h1>
      </div>
      <Separator className="my-4" />
      <Container className="flex flex-col items-start gap-6 rounded-lg border bg-accent/50 p-6 text-left md:rounded-xl md:p-12">
        <h1 className="!my-0 text-2xl sm:text-3xl font-bold">ACES</h1>
        <h3 className="!mb-0 text-muted-foreground text-base sm:text-lg">
          <Balancer>
            A website for the ACES club in DLSL. Written in Typescript with
            Next.js, TailwindCSS,
          </Balancer>
        </h3>
        <div className="not-prose flex items-center gap-2">
          <Link
            href="https://github.com/DLSLACES/aces-web"
            className="flex items-center space-x-1"
            target="_blank"
          >
            <Button
              className="group flex items-center text-base sm:text-xl decoration-1 p-0"
              variant="link"
            >
              <span>Repo</span>
              <GithubLogo className="scale-150 transition-all group-hover:translate-x-[2px]" />
            </Button>
          </Link>
          <Separator orientation="vertical" className="h-5 mx-2" />
          <Link
            href="https://dlsl-aces.vercel.app"
            className="flex items-center"
            target="_blank"
          >
            <Button
              className="group flex items-center text-base sm:text-xl decoration-1 p-0"
              variant="link"
            >
              <span>Check it out</span>
              <ArrowUpRight className="scale-150 transition-all group-hover:translate-x-[2px]" />
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default ACES;
