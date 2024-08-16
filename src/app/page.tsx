import Faqs from "@/components/home/Faqs";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import MyProfile from "@/components/MyProfile";
import ProjectStatistics from "@/components/home/ProjectStatistics";
import RoleSelectionLink from "@/components/home/RoleSelectionLink";
import Testimonials from "@/components/home/Testimonials";
import WhatWeOffer from "@/components/home/WhatWeOffer";
// import ErrorPage404 from "@/components/errorPage/errorPage404";
// import ErrorPage505 from "@/components/errorPage/errorPage505";

export default function Home() {
  return (
    <>
      <Hero />
      <RoleSelectionLink />
      <ProjectStatistics />
      <WhatWeOffer />
      <Testimonials />
      <Faqs />
      <MyProfile />
      {/* <ErrorPage404 />
      <ErrorPage505 /> */}
    </>
  );
}
