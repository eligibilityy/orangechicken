import Image from "next/image";
import Link from "next/link";
import OrangeChicken from "@/assets/orangechicken.png";

import { Section } from "@/components/craft";

const Hero = () => {
  return (
    <Section className="flex flex-col space-y-6">
      <div className="mx-auto inline w-36 md:w-48">
        <Image
          className=""
          width={192}
          height={108}
          src={OrangeChicken.src}
          alt=""
        ></Image>
      </div>
      <div className="md:text-lg space-y-2">
        <p>
          Hey! You can call me <span className="text-orange-500 font-medium">Elijah</span>.
          I&apos;m an 11th Grade Student from{" "}
          <Link href="https://www.dlsl.edu.ph/" className="inline-flex">
            De La Salle Lipa
          </Link>
          . I&apos;m into graphic design, front-end, and pixel art.
        </p>
        <div className="flex h-5 space-x-4 items-end !mt-6">
          <Link
            className="transition-all underline underline-offset-[6px] text-muted-foreground hover:text-orange-500 decoration-1"
            href="https://github.com/eligibilityy"
          >
            github
          </Link>
          <Link
            className="transition-all underline underline-offset-[6px] text-muted-foreground hover:text-orange-500 decoration-1"
            href="https://youtube.com/@yiliyaliya"
          >
            youtube
          </Link>
          <Link
            className="transition-all underline underline-offset-[6px] text-muted-foreground hover:text-orange-500 decoration-1"
            href="https://letterboxd.com/iyaiya/"
          >
            letterboxd
          </Link>
          <Link
            className="transition-all underline underline-offset-[6px] text-muted-foreground hover:text-orange-500 decoration-1"
            href="https://instagram.com/yiliya_liya"
          >
            instagram
          </Link>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
