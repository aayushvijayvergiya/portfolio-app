import React from "react";
import ContainerBlock from "../../components/ContainerBlock";
import ProjectsPage from "../../components/Projects";

export const metadata = {
  title: "Projects",
  description:
    "I've been developing websites for 5 years straight. Get in touch with me to know more.",
};

export default function Projects() {
  return (
    // <ContainerBlock>
      <ProjectsPage />
    // </ContainerBlock>
  );
}
