
import Projects from "../components/Projects";
import Testimonial from "../components/Testimonial";
import Hero from "../components/Hero";

import Service from "../components/Service";
import HomePagdData from "../data/HomePagdData.json";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home() {
  const {
    hero,
    socialBtns,


    projects,
    service,
    experience,
    testimonial,
    contact,
  } = HomePagdData;
  return (
    <>
      <Hero data={hero} socialData={socialBtns} />
      {/* <Brands data={brands} /> */}

      <Projects data={projects} />
      <Service data={service} />
      <Experience data={experience} />
      <Testimonial data={testimonial} />
      <Contact data={contact} socialData={socialBtns} />
    </>
  );
}
