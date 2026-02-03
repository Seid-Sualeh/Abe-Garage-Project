import React from "react";
import Video from "../../../components/OtherComponents/Video/Video";
import About from "../../../components/MainComponents/About/About";
import Service from "../../../components/MainComponents/Service/Service";
import Features from "../../../components//OtherComponents/Features/Features";
import WhyChoose from "../../../components/OtherComponents/WhyChoose/WhyChoose";
import Video2nd from "../../../components/OtherComponents/Video/Video2nd";
import Appointment from "../../../components/OtherComponents/CTA/Appointment";

export default function Home() {
  return (
    <>
      <Video />
      <About />
      <Service />
      <Features />
      <WhyChoose />
      <Video2nd />
      <Appointment />
    </>
  );
}
