import axios from "axios";

const getLatestRepos = async (data, token) => {
  try {
    const username = data.githubUsername;

    let token = `${process.env.GITHUB_AUTH_TOKEN}`;
    // console.log("TOKEN", token);

    if (token) {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      let repos = res.data;
      let latestSixRepos = repos.splice(0, 6);

      return latestSixRepos;
    } else {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`
      );
      let repos = res.data;
      let latestSixRepos = repos.splice(0, 6);
      return latestSixRepos;
    }
  } catch (err) {
    console.log("Error: ---- ", err);
  }
};

export default getLatestRepos;
