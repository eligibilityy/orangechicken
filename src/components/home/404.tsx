import Balancer from "react-wrap-balancer";
import Link from "next/link";
import { CornerLeftUp } from "lucide-react";

const FZF = () => {
  return (
    <div className="pt-16 md:pt-32">
      <div className="grid min-h-[70vh] grid-cols-12 gap-4 md:gap-8 px-4 md:px-0">
        <div className="col-span-12 col-start-1 flex flex-col items-center justify-center md:col-span-8 md:col-start-3">
          <h1 className="mb-0 text-[4rem] md:text-[8vw] font-bold leading-none text-center md:text-left text-foreground dark:text-neutral-50">
            4<span className="text-orange-500">0</span>4
          </h1>
          <h3 className="mt-4 md:mt-8 text-base md:text-xl font-normal text-center md:text-left text-muted-foreground dark:text-gray-400">
            <Balancer>
              Can&apos;t seem to find the page you&apos;re looking for.
            </Balancer>
          </h3>
          <Link
            href="/"
            className="mt-4 md:mt-8 dark:text-neutral-50 text-neutral-900 flex items-center gap-2 hover:line-through hover:text-orange-500"
          >
            <CornerLeftUp className="h-4 w-4" />
            <span className="tracking-wider">Return home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FZF;
