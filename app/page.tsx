"use client";

import Image from "next/image";
import Navbar  from "./components/Navbar";

import dynamic from "next/dynamic";
import Particles from "@/app/components/particles";
import AnimatedShinyText from "./components/animated-shiny-text";
import { AnimatedClickBtn } from "./components/AnimatedClickBtn";
import WordPullUp from "./components/word-pull-up";
import BlurIn from "./components/blur-in";
const ThemeComponent = dynamic(()=> import("./components/theme-switch"),{ssr:false});


export default function Home() {
  return (
    <div className="dark:text-black overflow-x-hidden  dark:bg-white text-white bg-[#08090a] h-screen">
      
       
        {/* <ThemeComponent /> */}
        <Navbar />
        <div className="relative">
        <div className="z-[100] w-full absolute">
            <div className="mx-auto">
              <AnimatedClickBtn />
            </div>
            <div className="mx-auto flex flex-col items-center justify-center">
              <p className="text-5xl font-medium">Launch your AI powered </p>
              <p className="text-5xl mt-4 font-medium">Portfolio <BlurIn className="noricanFont text-[#3ECF8E] neon" word="in minutes" /> </p>
              
            </div>
            
        </div>
        </div>

        <Particles />

        <div className="absolute ">
        
        </div>

        
        
      
    </div>
  );
}


