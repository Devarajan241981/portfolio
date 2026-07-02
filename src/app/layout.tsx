import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CodeFall } from "@/components/CodeFall";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jai Chandra Kumar Devarajan — Python Backend Developer",
  description:
    "Backend engineer specializing in Django REST Framework, FastAPI, and AI/LLM integration. Building REST APIs, microservices, and AI agent pipelines in production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          // runs before hydration so the correct theme applies with no flash
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=s||((window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CodeFall />
        {children}
      </body>
    </html>
  );
}
