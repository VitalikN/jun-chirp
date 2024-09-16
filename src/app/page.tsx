import MagicButton from "@/components/temp/magickButton";

import Faqs from "@/components/home/Faqs/Faqs";
import Hero from "@/components/home/Hero/Hero";
import ProjectStatistics from "@/components/home/ProjectStatistics/ProjectStatistics";
import RoleSelectionLink from "@/components/home/RoleSelectionLink/RoleSelectionLink";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import WhatWeOffer from "@/components/home/WhatWeOffer/WhatWeOffer";
import Error505 from "@/components/ErrorPage505/ErrorPage505";

export default function Home() {
  return (
    <>
      <Hero />
      <RoleSelectionLink />
      <ProjectStatistics />
      <WhatWeOffer />
      <Testimonials />
      <Faqs />

      <MagicButton />
    </>
  );
}
