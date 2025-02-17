import Nav from "@/components/Nav";
import Footer from "@/components/home/Footer";
import Image from "next/image";
import Balancer from "react-wrap-balancer";

export default function About() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pb-32">
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16 sm:mb-32">
            <div className="col-span-1 md:col-span-5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
                About Me
              </h1>
              <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 mt-4 sm:mt-6">
                — Eli, 17
              </p>
            </div>
            <div className="col-span-1 md:col-span-7">
              <Balancer>
                <p className="text-base leading-relaxed text-neutral-900 dark:text-neutral-50">
                  I am an aspiring front-end developer and graphic designer from
                  The Philippines. I still have a lot to experience and learn
                  from my peers and mentors. I&apos;m currently under the STEM
                  strand which means 1 million tests almost every week. When
                  I&apos;m not coding or designing, I&apos;m usually watching
                  movies, playing games with my friends, or drinking a good cup
                  of Figaro coffee.
                </p>
              </Balancer>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                src: "/images/bookshelf.jpg",
                alt: "About image 1",
                priority: true,
              },
              { src: "/images/chillguy.jpg", alt: "About image 2" },
              { src: "/images/library.jpg", alt: "About image 3" },
            ].map((img, index) => (
              <div key={index} className="aspect-[3/4] relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={img.priority}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
