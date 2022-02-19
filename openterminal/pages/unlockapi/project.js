import { Octokit } from '@octokit/rest';
import useSWR from 'swr';

async function fetcher(...arg) {
  const res = await fetch(...arg);

  return res.json();
}

export default function Project() {
  const { data, error } = useSWR('/api/unlockapi/loadrepos', fetcher)

  return data.repos;
}