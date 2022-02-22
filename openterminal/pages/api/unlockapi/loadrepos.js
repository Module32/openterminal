const { Octokit } = require("octokit");
import { useSession } from "next-auth/react"

export default async function Loadrepos(req, res) {
  const { data: session, status } = useSession()
  if (status !== "authenticated") { return 403 }
  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

  let repos = await octokit.request('GET /users/{username}/repos', {
    username: session.user.name
  }) 
  let len = Object.keys(repos.data).length
  let repos_arr = []
  for (var i = 0; i < len; i++) {
    repos_arr.push(repos.data[i].name)
  }

  return res.status(200).json({ user: session.user.name, repos: repos_arr })
}