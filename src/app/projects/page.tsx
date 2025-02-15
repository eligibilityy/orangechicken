import { Metadata } from "next";
import Projects from "@/components/proj/Projects";
import Designs from "@/components/proj/Designs";
import { Section, Container } from "@/components/craft";
import Nav from "@/components/Nav";
import Footer from "@/components/home/Footer";

export const metadata: Metadata = {
  title: "Projects",
  description: "Check out my projects and graphic designs.",
};

export default function ProjectsPage() {
  return (
    <>
      <Section className="not-prose">
        <Container>
          <div className="m-auto h-full w-full max-w-5xl px-4 py-2 md:px-6 md:py-6">
            <Nav />
            <div className="mt-24">
              <h1 className="text-4xl font-bold mb-2">
                projects<span className="text-orange-500">,</span>
              </h1>
              <Projects />
              <h1 className="text-4xl font-bold mb-2 mt-24">
                designs<span className="text-orange-500">,</span>
              </h1>
              <Designs />
            </div>
            <Footer />
          </div>
        </Container>
      </Section>
    </>
  );
} 