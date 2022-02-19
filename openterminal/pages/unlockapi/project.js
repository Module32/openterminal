import { Octokit } from '@octokit/rest';

export default function Project() {
  export default async (req, res) => {
    const octokit = new Octokit({
      auth: process.env.GITHUB_AUTH_TOKEN
    })
    const repos = await octokit.request('GET /repos/{owner}', {
      owner: 'Module64',
    })
    console.log(repos);
  }
  return 'success'
}