import { Octokit } from '@octokit/rest';
import useSWR from 'swr';
import fetch from '../../libs/fetch.js';

async function fetcher(...arg) {
  const res = await fetch(...arg);

  return res.json();
}

export default function Project() {
  const { data, error } = useSWR('/api/unlockapi/loadrepos', fetch)

  if (error) return "failed to retrieve data"

  return data.repos;
}