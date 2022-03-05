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
    console.log(repos);
    let len = Object.keys(repos.data).length
    let repos_arr = []
    for (var i = 0; i < len; i++) {
      repos_arr.push(repos.data[i].name)
    }

    res.status(200).json({ user: user, repos: repos_arr })
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'failed to load data' })
  }
}