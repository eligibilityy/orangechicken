import Link from "next/link";
import ModeToggle from "./theme";

const Nav = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between">
      <div className="space-y-2">
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight">
          yiliya<span className="text-orange-500">.</span>{" "}
          {/* eslint-disable-next-line */}
        </h1>
      </div>
      <div className="flex items-center justify-between md:justify-center sm:items-center mb-4 md:mb-0">
        <div className="flex sm:mr-4 mr-0 gap-4">
          <Link
            className="transition-all opacity-70 hover:opacity-90 hover:-mt-px hover:mb-px"
            href="/"
          >
            <span className="text-orange-500">/</span>home
          </Link>
          <Link
            className="transition-all opacity-70 hover:opacity-90 hover:-mt-px hover:mb-px"
            href="/gallery"
          >
            <span className="text-orange-500">/</span>gallery
          </Link>
        </div>
        {/* <Button className="group flex items-center" variant="default">
                <Link href="#" className="flex items-center gap-1">
                  Aces
                  <ArrowRight className="w-4 transition-all group-hover:translate-x-[2px]" />
                </Link>
              </Button> */}
        <div>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Nav;
