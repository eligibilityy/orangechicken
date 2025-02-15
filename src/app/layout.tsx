import { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_provider";
import ReactQueryProvider from "@/components/queryProvider";
import { ReactLenis } from "@/lib/lenis";
import Preloader from "@/components/Preloader";
import GSAPProvider from "@/components/GSAPProvider";
import Noise from "@/components/Noise";
import PageTransition from "@/components/PageTransition";

const InstrumentSans = Instrument_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "orange chicken",
    template: "%s | orange chicken",
  },
  description: "I just really, really, really love orange chicken.",
  keywords: [
    "Frontend Developer",
    "Graphic Designer",
    "Pixel Artist",
    "Student Developer",
    "Web Development",
  ],
  authors: [
    {
      name: "Elijah",
      url: "https://github.com/eligibilityy",
    },
  ],
  creator: "Elijah",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yiliya.me",
    title: "orangechicken",
    description: "I just really, really, really love orange chicken.",
    siteName: "orange chicken",
  },
  twitter: {
    card: "summary_large_image",
    title: "orangechicken",
    description: "I just really, really, really love orange chicken.",
  },
  icons: {
    icon: ["/favicon.ico"],
    apple: ["/apple-touch-icon.png"],
    shortcut: ["/favicon-32x32.png"],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={InstrumentSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <ReactLenis root>
              <GSAPProvider>
                <Preloader />
                <PageTransition />
                <Noise />
                <main data-page-content>
                  {children}
                </main>
              </GSAPProvider>
            </ReactLenis>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
