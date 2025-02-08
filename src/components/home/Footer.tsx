import Link from "next/link";

import Balancer from "react-wrap-balancer";

import { Button } from "../ui/button";

import { Github, Drumstick, Youtube, Instagram } from "lucide-react";

import { Section } from "../craft";
import { FilmReel } from "@phosphor-icons/react/dist/ssr";
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer>
      <Section>
        <div className="not-prose flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-4">
            <h3 className="sr-only">yiliya</h3>
            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">
              <span className="text-orange-500">orange</span>chicken
            </h1>
            <Drumstick className="scale-110 sm:scale-150 mt-2" />
          </Link>
          <p className="text-muted-foreground">
            <Balancer>
              I just really, really, really love orange chicken.
            </Balancer>
          </p>
          <div className="h-5 flex items-center gap-4 md:mb-0 flex-row">
            <Link
              className="mb-1 transition-all underline underline-offset-[6px] text-muted-foreground hover:text-orange-500 decoration-1"
              href="/"
              rel="noopener noreferrer"
            >
              home
            </Link>
            <Separator orientation="vertical"  className="hidden sm:inline-block"/>
            <Link
              className="mb-1 transition-all underline underline-offset-[6px] text-muted-foreground hover:text-orange-500 decoration-1"
              href="/gallery"
              rel="noopener noreferrer"
            >
              gallery
            </Link>
          </div>
        </div>
      </Section>
      <Section className="not-prose flex flex-col justify-between gap-6 border-t md:flex-row md:items-center md:gap-2">
        <div className="flex gap-2">
          <Link
            href="https://github.com/eligibilityy"
            className="flex items-center"
          >
            <Button variant="outline" size="icon">
              <Github />
            </Button>
          </Link>
          <Link
            href="https://youtube.com/yiliyaliya"
            className="flex items-center"
          >
            <Button variant="outline" size="icon">
              <Youtube />
            </Button>
          </Link>
          <Link
            href="https://letterboxd.com/iyaiya/"
            className="flex items-center"
          >
            <Button variant="outline" size="icon">
              <FilmReel />
            </Button>
          </Link>
          <Link
            href="https://instagram.com/yiliya_liya/"
            className="flex items-center"
          >
            <Button variant="outline" size="icon">
              <Instagram />
            </Button>
          </Link>
        </div>
        <p className="text-muted-foreground">
          &copy; <a href="https://github.com/eligibilityy">yiliya</a>. All rights
          reserved. 2025-present.
        </p>
      </Section>
    </footer>
  );
}
