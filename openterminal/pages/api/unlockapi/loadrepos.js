import { Octokit } from '@octokit/rest';

export default async function loadrepos(req, res) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN
  })
  const repos = await octokit.request('GET /users/{username}/repos', {
    username: 'Module32',
  })

  return res.status(200).json({ repos: repos })
}