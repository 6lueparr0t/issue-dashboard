import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Octokit } from "octokit";
import fp from "lodash/fp";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(n: number = 500) {
  return new Promise((r) => setTimeout(r, n));
}

// Octokit.js
// https://github.com/octokit/core.js#readme
export const request = async (method: string, repo: string, option: object = {}) => {
  const owner = import.meta.env.VITE_APP_GIT_OWNER;
  const auth = import.meta.env.VITE_APP_GIT_TOKEN;

  const octokit = new Octokit({
    auth: auth,
  });

  let query: string = "";

  if (!fp.isEqual(option, {})) {
    query = fp.pipe(
      fp.toPairs, // 입력 : { name: 'John', age: 30 }; // 출력: [['name', 'John'], ['age', 30]]
      fp.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`),
      fp.join("&")
    )(option);
  }

  // https://api.github.com/repos/6lueparr0t/issue-dashboard-{{type}}/issues
  const response = await octokit.request(
    `${method.toUpperCase()} /repos/${owner}/issue-dashboard-${repo}/issues?${query ?? ""}`,
    {
      owner: owner,
      repo: repo,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return response;
};
