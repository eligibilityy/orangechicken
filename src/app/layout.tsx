import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./_provider";
import ReactQueryProvider from "@/components/queryProvider"; // Import the wrapper

const InstrumentSans = Instrument_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "orange chicken",
    template: "%s | orange chicken",
  },
  description: "I really love orange chicken.",
  icons: {
    icon: ['/favicon.ico'],
    apple: ['/favicon.ico'],
    shortcut: ['/favicon.ico'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${InstrumentSans.className} antialiased`}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
