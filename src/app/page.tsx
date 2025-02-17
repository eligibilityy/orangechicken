import Nav from "@/components/Nav";
import Link from "next/link";
import { GitBranch, ArrowUpRight } from "lucide-react";
import Footer from "@/components/home/Footer";
import Weather from "@/components/home/Weather";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLetterboxd } from "react-icons/fa6";
import { PiMonitorBold } from "react-icons/pi";
import Discord from "@/components/home/Discord";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          <div className="col-span-12 md:col-span-8 flex flex-col gap-2 text-neutral-900 dark:text-neutral-50 px-4 py-6 sm:p-0 relative">
            <div className="flex flex-col flex-1">
              <h1 className="text-4xl md:text-6xl xl:text-7xl leading-none tracking-tight font-semibold mb-2">
                Hi, I&apos;m <span className="text-orange-500">Elijah</span>
              </h1>
              <p className="text-base md:text-lg leading-normal tracking-tight text-neutral-600 dark:text-muted-foreground max-w-2xl mb-6">
                I&apos;m an 11th Grade Student from{" "}
                <Link
                  href="https://www.dlsl.edu.ph"
                  className="hover:line-through text-orange-500 italic"
                >
                  De La Salle Lipa
                </Link>
                . I&apos;m into graphic design, front-end development, and pixel
                art. As of now, I&apos;m working on{" "}
                <span className="hover:line-through hover:cursor-pointer text-orange-500 italic">
                  personal projects
                </span>{" "}
                to better my understanding of web development and design!
              </p>
            </div>
            <div className="self-start">
              <Discord />
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 space-y-6">
            <div className="bg-neutral-900 p-6 sm:p-12">
              <Weather />
            </div>
            <div className="bg-orange-500 text-neutral-50 p-6 sm:p-12">
              <h3 className="text-lg sm:text-2xl font-semibold flex items-center gap-1">
                <PiMonitorBold />
                Currently Working On:
              </h3>
              <Link
                href="https://tala.yiliya.me"
                className="text-base md:text-lg leading-normal hover:line-through text-neutral-100/70 max-w-2xl"
              >
                Tala Lasalyano
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 my-8">
          <Link
            href="https://github.com/eligibilityy"
            className="bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 p-4 hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors flex items-center justify-center"
          >
            <span className="text-base flex items-center gap-2">
              <FaGithub />
              <span className="hidden sm:inline">GitHub</span>
            </span>
          </Link>
          <Link
            href="https://instagram.com/yiliya_liya"
            className="bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-50 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
          >
            <span className="text-base flex items-center gap-2">
              <FaInstagram />
              <span className="hidden sm:inline">Instagram</span>
            </span>
          </Link>
          <Link
            href="https://youtube.com/@yiliyaliya"
            className="bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900 p-4 hover:bg-neutral-800 dark:hover:bg-neutral-300 transition-colors flex items-center justify-center"
          >
            <span className="text-base flex items-center gap-2">
              <FaYoutube />
              <span className="hidden sm:inline">YouTube</span>
            </span>
          </Link>
          <Link
            href="https://letterboxd.com/iyaiya"
            className="bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-50 p-4 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center"
          >
            <span className="text-base flex items-center gap-2">
              <FaLetterboxd />
              <span className="hidden sm:inline">Letterboxd</span>
            </span>
          </Link>
        </div>

        {/* Projects & Widgets Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Projects Column */}
          <div className="col-span-12 md:col-span-6 space-y-6">
            {/* Featured Project */}
            <Link
              href="https://dlsl-aces.vercel.app"
              className="block bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-50 p-6 sm:p-12 group relative hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">DLSL ACES</h3>
                </div>
                <p className="text-sm md:text-base leading-normal tracking-tight text-neutral-600 dark:text-neutral-300">
                  A website for the SHS ACES club in DLSL. Nextjs + TailwindCSS.
                </p>
              </div>
            </Link>
          </div>
          <div className="col-span-12 md:col-span-6 space-y-6">
            <Link
              href="https://tala.yiliya.me"
              className="block bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-50 p-6 sm:p-12 group relative hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  <h3 className="text-xl font-semibold">Tala Lasalyano</h3>
                </div>
                <p className="text-sm md:text-base leading-normal tracking-tight text-neutral-600 dark:text-neutral-300">
                  Anonymous letter posting. Nextjs + Supabase.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
