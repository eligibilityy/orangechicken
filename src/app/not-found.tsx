import { Section, Container } from "@/components/craft";
import FZF from "@/components/home/404";
import Footer from "@/components/home/Footer";
import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Section className="not-prose">
        <Container>
          <div className="m-auto h-full w-full max-w-5xl px-4 py-4 md:px-6 md:py-10">
            <Nav />
            <FZF />
            <Footer />
          </div>
        </Container>
      </Section>
    </>
  );
}
