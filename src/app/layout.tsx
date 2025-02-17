import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/app/_provider";
import ReactQueryProvider from "@/components/queryProvider";
import { ReactLenis } from "@/lib/lenis";
import GSAPProvider from "@/components/GSAPProvider";
import Helvetica_Neue from "next/font/local";
import Noise from "@/blocks/Animations/Noise/Noise";

const helvetica = Helvetica_Neue({
  src: "../assets/fonts/HelveticaNeue/HelveticaNeue-Medium.woff2",
  variable: "--font-helvetica",
});

export const metadata: Metadata = {
  title: "Elijah",
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
    title: "yiliya.me",
    description: "I just really, really, really love orange chicken.",
    siteName: "orange chicken",
  },
  twitter: {
    title: "yiliya.me",
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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={helvetica.variable}>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <ReactLenis root>
              <GSAPProvider>
                <div className="w-full h-full fixed inset-0 pointer-events-none z-50">
                  <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={5}
                    patternAlpha={15}
                  />
                </div>
                <main data-page-content>{children}</main>
              </GSAPProvider>
            </ReactLenis>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
