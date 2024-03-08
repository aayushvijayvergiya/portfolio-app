import React from "react";
import ContainerBlock from "../../components/ContainerBlock";
import AboutMe from "../../components/AboutMe";

export const metadata = {
  title: "About",
  description:
    "I've been developing websites for 5 years straight. Get in touch with me to know more.",
};

export default function about() {
  return (
    // <ContainerBlock>
      <AboutMe />
    // </ContainerBlock>
  );
}
