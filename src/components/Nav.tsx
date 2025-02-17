"use client";

import Link from "next/link";
import ModeToggle from "./theme";

const Nav = () => {
  return (
    <nav className="fixed w-full top-0 left-0 z-40 px-6 py-4 bg-white dark:bg-black">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-semibold dark:text-white text-neutral-900 hover:text-orange-500 hover:line-through"
        >
          yiliya.
        </Link>
        <div className="flex gap-8">
          <Link
            href="/"
            className="text-base font-medium hover:opacity-50 transition-opacity dark:text-white text-neutral-900"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-base font-medium hover:opacity-50 transition-opacity dark:text-white text-neutral-900"
          >
            About
          </Link>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Nav;
