import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portify",
  description: "Portify is a free app that lets you launch your AI-powered portfolio in just minutes. Showcase your skills, projects, and achievements effortlessly with our user-friendly platform.",
};

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
     <html lang="en">
     <head>
       <script
         dangerouslySetInnerHTML={{
           __html: ""
         }}
       />
     </head>
     <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#08090a] antialiased`}
      >
        <Providers>
        <Toaster />
        {children}
        </Providers>
      </body>
   </html>
  );
}



