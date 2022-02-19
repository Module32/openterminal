import { Octokit } from '@octokit/rest';

export default async function Project() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN
  })
  const repos = await octokit.request('GET /repos/{owner}', {
    owner: 'Module64',
  })
  return (
    repos
  )
}