import React from "react";
import ContainerBlock from "../../components/ContainerBlock";
import Contact from "../../components/Contact";

export const metadata = {
  title: "Contact me",
  description:
    "I've been developing websites for 5 years straight. Get in touch with me to know more.",
};

export default function contact() {
  return (
    // <ContainerBlock>
      <Contact />
    // </ContainerBlock>
  );
}
