const { Octokit } = require("octokit");
import { getSession } from "next-auth/react"

export default async function Loadrepos(req, res) {
  const session = await getSession({ req });
  if (session === null) { return 403; }
  const user = session.user.name;
  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

    let repos = await octokit.paginate('GET /users/{username}/repos', {
      username: user,
    })
    let repo_arr = []
    repos.map(repo => {
      repo_arr.push(repo.name);
    })

    res.status(200).json({ user: user, repos: repo_arr })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'failed to load data' })
  }
}