import FavouriteProjects from "../components/FavouriteProjects";
import LatestRepositories from "../components/LatestRepositories";
import Hero from "../components/Hero";
import getLatestRepos from "@lib/getLatestRepos";
import userData from "@constants/data";
import React from "react";

export const metadata = {
  title: "Aayush Vijayvergiya - FullStack Developer",
  description:
    "I've been developing websites for 5 years straight. Get in touch with me to know more.",
};

const Home: React.FC = async ({}) => {
  // console.log(process.env.GITHUB_AUTH_TOKEN);
  let token = process.env.GITHUB_AUTH_TOKEN;

  const repositories = await getLatestRepos(userData, token);

  return (
    <>
      <Hero />
      <FavouriteProjects />
      <LatestRepositories repositories={repositories} />
    </>
  );
};

export default Home;
