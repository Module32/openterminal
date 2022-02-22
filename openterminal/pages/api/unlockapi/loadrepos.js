const { Octokit } = require("octokit");

export default async function Loadrepos(req, res) {
  const octokit = new Octokit({ auth: process.env.GITHUB_AUTH_TOKEN });

  let repos = await octokit.request('GET /users/{username}/repos', {
    username: 'Module32'
  }) 
  let len = Object.keys(repos.data).length
  let repos_arr = []
  for (var i = 0; i < len; i++) {
    repos_arr.push(repos.data[i].name)
  }

  return res.status(200).json({ user: 'Module32', repos: repos_arr })
}