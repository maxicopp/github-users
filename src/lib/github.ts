import { GitHubUser } from "@/types/github";

const GITHUB_API_URL = 'https://api.github.com';

export async function getUsers(): Promise<GitHubUser[]> {
    const res = await fetch(`${GITHUB_API_URL}/users`);
    if (!res.ok) throw new Error('Error al obtener los usuarios');
    return res.json();
  }

  export async function getUserDetails(username: string): Promise<GitHubUser> {
    const res = await fetch(`${GITHUB_API_URL}/users/${username}`);
    if (!res.ok) throw new Error('Error al obtener los detalles del usuario');
    return res.json();
  }

  export async function searchUsers(query: string) {
    const res = await fetch(
      `${GITHUB_API_URL}/search/users?q=${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error('Error al buscar los usuarios');
    return res.json();
  }
