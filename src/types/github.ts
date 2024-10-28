export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
}

export interface SearchUsersResponse {
  items: GitHubUser[];
  total_count: number;
}
