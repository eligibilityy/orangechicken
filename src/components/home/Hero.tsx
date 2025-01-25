import Image from "next/image";
import Link from "next/link";
import OrangeChicken from "@/assets/orangechicken.png";

import { Section } from "@/components/craft";
import { Separator } from "@/components/ui/separator";

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
          Front-end, graphic design,{" "}
          <span className="italic">certified house flipper</span>
        </p>
        <div className="flex h-5 space-x-4 items-end">
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
        </div>
      </div>
    </Section>
  );
};

export default Hero;
