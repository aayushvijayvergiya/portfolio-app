"use client";

import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface ContainerBlockProps {
  children: React.ReactNode;
}

const ContainerBlock: React.FC<ContainerBlockProps> = ({
  children,
  ...customMeta
}) => {
  const path = usePathname();

  const meta = {
    title: "Aayush Vijayvergiya - FullStack Developer",
    description: `I've been developing websites for 5 years straight. Get in touch with me to know more.`,
    image: "/avatar.png",
    type: "website",
    date: "",
    ...customMeta,
  };
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <main className="dark:bg-gray-800 w-full">
        <Navbar />
        <div>{children}</div>
        <Footer />
      </main>
    </div>
  );
};

export default ContainerBlock;
