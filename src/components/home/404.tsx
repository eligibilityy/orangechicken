import Balancer from "react-wrap-balancer";

import { Container, Section } from "@/components/craft";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight, CornerLeftUp } from "lucide-react";

const FZF = () => {
  return (
    <Section>
      <Container className="flex flex-col text-center">
        <h1 className="!mb-0 text-5xl font-semibold">4<span className="text-orange-500">0</span>4</h1>
        <h3 className="text-muted-foreground">
          <Balancer>
            Can&apos;t seem to find the page you&apos;re looking for.
          </Balancer>
        </h3>
        <div className="mx-auto !mt-8 flex items-center gap-2">
          <Button
            asChild
            className="group flex items-center text-lg decoration-1"
            variant="default"
          >
            <Link className="transition-all decoration-1" href="/">
              <CornerLeftUp strokeWidth="3px" className="mb-[2px]"/>
              <span>Go back</span>
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
};

export default FZF;
