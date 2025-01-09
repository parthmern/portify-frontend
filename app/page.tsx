"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";

import dynamic from "next/dynamic";
import Particles from "@/app/components/particles";
import AnimatedShinyText from "./components/animated-shiny-text";
import { AnimatedClickBtn } from "./components/AnimatedClickBtn";
import WordPullUp from "./components/word-pull-up";
import BlurIn from "./components/blur-in";
import { RainbowButton } from "./components/rainbow-button";
import HeroVideoDialog from "./components/hero-video-dialog";
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ThemeComponent = dynamic(() => import("./components/theme-switch"), {
  ssr: false,
});

export default function Home() {

  const router = useRouter();

  const { data: session } = useSession(); 


  const handleClick = () => {
    console.log(session?.user?.email);
    if (!session?.user?.email) {
      router.push('/login');
    } else {
      router.push('/profile');
    }
  };


 
  return (
    <div className="dark:text-black overflow-x-hidden  dark:bg-white text-white bg-[#08090a]  h-screen">
      {/* <ThemeComponent /> */}
      <Navbar />
      <div className="relative">
        <div className="z-[100] w-full absolute">
          <div className="mx-auto">
            <AnimatedClickBtn />
          </div>
          <div className="mx-auto -mt-10 flex flex-col items-center justify-center">
            <p className="text-5xl font-medium">Launch your AI powered </p>
            <p className="text-5xl mt-4 font-medium">
              Portfolio{" "}
              <BlurIn
                className="noricanFont text-[#3ECF8E] neon"
                word="in minutes"
              />{" "}
            </p>
          </div>
          <div className="mx-auto flex flex-col mt-14 items-center justify-center">
            <RainbowButton onClick={handleClick} children="Build for Free" />
          </div>
          <div className="mx-auto flex flex-col mt-14 items-center justify-center">
            <p>Right now in Developing phase ...</p>
            {/* <p>Facing issue? connect with me</p> */}
          </div>
        </div>
      </div>

      <Particles />

      <div className="w-full h-full mt-11 ">
        <div className="relative z-[9999] glowing-box w-[70%] mx-auto">
          
          <HeroVideoDialog
            className="dark:hidden block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://res.cloudinary.com/dncm3mid4/image/upload/v1734582023/githubreadme/wo78srzkxifjhqsm34nu.jpg"
            thumbnailAlt="Hero Video"
          />
          <HeroVideoDialog
            className="hidden dark:block"
            animationStyle="from-center"
            videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
            thumbnailSrc="https://res.cloudinary.com/dncm3mid4/image/upload/v1734581885/githubreadme/l4jwwoel56d9hduovjxh.jpg"
            thumbnailAlt="Hero Video"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
