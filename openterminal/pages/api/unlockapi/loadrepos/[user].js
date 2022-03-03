const { Octokit } = require("octokit");
import { useRouter } from 'next/router';

export default async function Loadrepos(req, res) {
  try {
    const router = useRouter()
    const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });
    const { user } = router.query;

    let repos = await octokit.request('GET /users/{username}/repos', {
      username: user,
    }) 
    let len = Object.keys(repos.data).length
    let repos_arr = []
    for (var i = 0; i < len; i++) {
      repos_arr.push(repos.data[i].name)
    }

    return res.status(200).json({ user: user, repos: repos_arr })
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}