const { Octokit } = require("octokit");
import { getSession } from "next-auth/react"

export default async function Loadrepos(req, res) {
  const session = await getSession({ req });
  const user = session.user.name;
  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

  let repos = await octokit.paginate('GET /users/{username}/repos', {
    username: user,
  })

  res.status(200).json({ user: user, repos: repos })
}