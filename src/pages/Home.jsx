
import Projects from "../components/Projects";
import Testimonial from "../components/Testimonial";
import Hero from "../components/Hero";

import Service from "../components/Service";
import HomePagdData from "../data/HomePagdData.json";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Education from "../components/Education";
import Certifications from "../components/Certifications";

export default function Home() {
  const {
    hero,
    socialBtns,
    projects,
    service,
    experience,
    testimonial,
    contact,
    credentials,
  } = HomePagdData;

  return (
    <>
      <Hero data={hero} socialData={socialBtns} />

      <Projects data={projects} />
      <Service data={service} />
      <Experience data={experience} />
      <Education data={credentials?.education} />
      <Certifications data={credentials?.certifications} />
      <Testimonial data={testimonial} />
      <Contact data={contact} socialData={socialBtns} />
    </>
  );
}
