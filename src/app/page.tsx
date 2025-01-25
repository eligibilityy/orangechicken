import { Section, Container } from "@/components/craft";
import ACES from "@/components/home/Feature";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import Nav from "@/components/Nav";
import GitHubRepos from "@/components/proj/Github";

export default function Home() {
  return (
    <>
      <Section className="not-prose">
        <Container>
          <div className="m-auto h-full w-full max-w-5xl px-4 py-4 md:px-6 md:py-10">
            <Nav />
            <Hero />
            <ACES />
            <GitHubRepos username="eligibilityy" />
            <Footer />
          </div>
        </Container>
      </Section>
    </>
  );
}
