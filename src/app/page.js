import About from "@/Components/Layout/About";
import Contact from "@/Components/Layout/Contact";
import Header from "@/Components/Layout/Header";
import Hero from "@/Components/Layout/Hero";
import HomeMenu from "@/Components/Layout/HomeMenu";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      
      <Hero/>
      <HomeMenu/>
      <div id='about'>
        <About />
      </div>
        <div id='contact'>
          <Contact/>
        </div>
    </>
  );
}
