import { Section, Container } from "@/components/craft";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Nav from "@/components/Nav";
import GitHubRepos from "@/components/proj/Github";
import { Popup } from "../components/home/Popover";
import Cooking from "@/components/home/Feature";

export default function Home() {
  return (
      <Section className="not-prose">
        <Container>
          <div className="m-auto h-full w-full max-w-5xl px-4 py-4 md:px-6 md:py-10">
            <Nav />
            <Hero />
            <Cooking />
            <GitHubRepos username="eligibilityy" />
            <Popup />
            <Footer />
          </div>
        </Container>
      </Section>
  );
}
