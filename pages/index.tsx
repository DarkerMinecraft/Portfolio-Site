import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { PageInfo, Experience, Skill, Project, Social } from "@/typings";
import { fetchPageInfo } from "@/utilites/fetchPageInfo";
import { fetchExperiences } from "@/utilites/fetchExperiences";
import { fetchSkills } from "@/utilites/fetchSkills";
import { fetchProjects } from "@/utilites/fetchProjects";
import { fetchSocial } from "@/utilites/fetchSocial";
import { urlFor } from "@/sanity";
import Head from "next/head";

type Props = {
  pageInfo: PageInfo;
  experiences: Experience[];
  socials: Social[];
  skills: Skill[];
  projects: Project[];
};

const Home = ({ pageInfo, socials, experiences, skills, projects }: Props) => {
  return (
    <div
      className="bg-[rgb(36,36,36)] text-center text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0
      scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/40"
    >
      <Head>
        <title>{`${pageInfo?.name} - Portfolio`}</title>
      </Head>

      <Header socials={socials} />
      {/* Hero */}
      <section id="hero" className="snap-start">
        <Hero pageInfo={pageInfo} />
      </section>
      {/* About */}
      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>
      {/* Experience */}
      <section id="experience" className="snap-center">
        <WorkExperience experiences={experiences} />
      </section>
      {/* Skills */}
      <section id="skills" className="snap-start">
        <Skills skills={skills} />
      </section>
      {/* Projects */}
      <section id="projects" className="snap-center">
        <Projects projects={projects} />
      </section>
      {/* Contact Me */}
      <section id="contact" className="snap-start">
        <ContactMe />
      </section>

      <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center">
            <img
              className="h-10 w-10 rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
              src={urlFor(pageInfo?.heroImage).url()}
            />
          </div>
        </footer>
      </Link>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo();
  const experiences: Experience[] = await fetchExperiences();
  const skills: Skill[] = await fetchSkills();
  const projects: Project[] = await fetchProjects();
  const socials: Social[] = await fetchSocial();

  return {
    props: {
      pageInfo,
      experiences,
      skills,
      projects,
      socials,
    },
  };
};
