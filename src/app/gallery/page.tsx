import { Container, Section } from "@/components/craft";
import Nav from "@/components/Nav";
import { Popup } from "@/components/home/Popover";
import Footer from "@/components/home/Footer";
import { Metadata } from "next";
import ProjectGallery from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "gallery",
};

export default function Gallery() {
  return (
    <Section className="not-prose">
      <Container>
        <div className="m-auto h-full w-full max-w-5xl px-4 py-4 md:px-6 md:py-10">
          <Nav />
          <ProjectGallery />
          <Popup />
          <Footer />
        </div>
      </Container>
    </Section>
  );
}
