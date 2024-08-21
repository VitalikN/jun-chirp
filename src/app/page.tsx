// import ErrorPage404 from "@/components/errorPage/errorPage404";
// import ErrorPage505 from "@/components/errorPage/errorPage505";

import Faqs from "@/components/home/Faqs/Faqs";
import Hero from "@/components/home/Hero/Hero";
import ProjectStatistics from "@/components/home/ProjectStatistics/ProjectStatistics";
import RoleSelectionLink from "@/components/home/RoleSelectionLink/RoleSelectionLink";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import WhatWeOffer from "@/components/home/WhatWeOffer/WhatWeOffer";

export default function Home() {
  return (
    <>
      <Hero />
      <RoleSelectionLink />
      <ProjectStatistics />
      <WhatWeOffer />
      <Testimonials />
      <Faqs />

      {/* <ErrorPage404 />
      <ErrorPage505 /> */}
    </>
  );
}
