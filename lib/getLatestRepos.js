import axios from "axios";

const getLatestRepos = async (data, token) => {
  try {
    const username = data.githubUsername;

    let token = `token ${process.env.GITHUB_AUTH_TOKEN}`;
    // console.log("TOKEN", token);

    if (token) {
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=user:${username}+sort:author-date-desc`,
        // `https://api.github.com/users/${username}/repos`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      let repos = res.data.items;
      let latestSixRepos = repos.splice(0, 6);

      return latestSixRepos;
    } else {
      const res = await axios.get(
        `https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`
      );
      let repos = res.data.items;
      let latestSixRepos = repos.splice(0, 6);
      return latestSixRepos;
    }
  } catch (err) {
    console.log('Error: ---- ', err);
  }
};

export default getLatestRepos;
