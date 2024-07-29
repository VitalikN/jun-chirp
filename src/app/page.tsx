import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MyProfile from "@/components/MyProfile";
import ProjectStatistics from "@/components/ProjectStatistics";
import RoleSelectionLink from "@/components/RoleSelectionLink";
import Testimonials from "@/components/Testimonials";
import WhatWeOffer from "@/components/WhatWeOffer";

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

      <Footer />
    </>
  );
}
