import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import fp from "lodash/fp";

import { Octokit } from "octokit";
import { graphql } from "@octokit/graphql";

import { PER_PAGE } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(n: number = 500) {
  return new Promise((r) => setTimeout(r, n));
}

export const makeQuery = (query: object) =>
  "&" +
  fp.pipe(
    fp.toPairs, // 입력 : { name: 'John', age: 30 }; // 출력: [['name', 'John'], ['age', 30]]
    fp.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`),
    fp.join("&")
  )(query);

const owner = import.meta.env.VITE_APP_GIT_OWNER;
const auth = import.meta.env.VITE_APP_GIT_TOKEN;

const octokit = new Octokit({
  auth: auth,
});

// Octokit.js
// https://github.com/octokit/core.js#readme
export const requestList = async (
  category: string,
  option: { per_page?: number } = { per_page: PER_PAGE },
  issueNumber: number = 0
) => {
  const repo = `issue-dashboard-${category}`;

  const issuePath: string = issueNumber ? "/" + String(issueNumber) : "";

  let optionQuery: string = "";
  if (!fp.isEqual(option, {})) {
    optionQuery =
      "?" +
      fp.pipe(
        fp.toPairs, // 입력 : { name: 'John', age: 30 }; // 출력: [['name', 'John'], ['age', 30]]
        fp.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`),
        fp.join("&")
      )(option);
  }

  const response = await octokit.request(
    `GET /repos/${owner}/${repo}/issues${issuePath}${optionQuery ?? ""}`,
    {
      owner: owner,
      repo: repo,
      per_page: option.per_page,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return response;
};

export const search = async (
  category: string,
  query: { keyword: string; in: string },
  option: object = {}
) => {
  const repo = `issue-dashboard-${category}`;

  let qQuery: string = "q=";
  if (!fp.isEqual(query, {})) {
    qQuery += encodeURIComponent(`${query.keyword} in:${query.in} repo:${owner}/${repo}`);
  }

  let optionQuery: string = "";
  if (!fp.isEqual(option, {})) {
    optionQuery = makeQuery(option);
  }

  const response = await octokit.request(`GET /search/issues?${qQuery ?? ""}${optionQuery ?? ""}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return response;
};

interface DeleteIssueResult {
  deleteIssue: {
    clientMutationId: string;
  };
  status?: boolean;
}

export const requestDelete = async (nodeId: string): Promise<DeleteIssueResult> => {
  try {
    const graphqlResponse = (await graphql(
      `
        mutation {
          deleteIssue(input: {issueId: "${nodeId}", clientMutationId: "delete"}) {
            clientMutationId
          }
        }
      `,
      {
        headers: {
          authorization: `token ${auth}`,
        },
      }
    )) as DeleteIssueResult;
    graphqlResponse.status = true;
    return graphqlResponse;
  } catch (error) {
    return { deleteIssue: { clientMutationId: "already delete" }, status: false };
  }
};

export const requestCreate = async (
  category: string,
  issue: {
    title: string,
    body: string,
  },
) => {
  const repo = `issue-dashboard-${category}`;

  const response = await octokit.request(
    `POST /repos/${owner}/${repo}/issues`,
    {
      owner: owner,
      repo: repo,
      title: issue.title,
      body: issue.body,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return response;
};

export const requestPatch = async (
  category: string,
  issue: {
    title: string,
    body: string,
  },
  issueNumber: number = 0,
) => {
  const repo = `issue-dashboard-${category}`;

  const issuePath: string = issueNumber ? "/" + String(issueNumber) : "";

  const response = await octokit.request(
    `PATCH /repos/${owner}/${repo}/issues${issuePath}`,
    {
      owner: owner,
      repo: repo,
      title: issue.title,
      body: issue.body,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  return response;
};

export const parseData = (item: object) => ({
  ...fp.pick(["number", "title", "body", "created_at", "updated_at", "node_id"], item),
  user: fp.pick(["avatar_url", "login"], fp.get("user", item)),
});

export const parseLastPage = (props: {
  data: { total_count?: number };
  headers: { link?: string };
}): number =>
  Number(
    fp.pipe(
      fp.find((link: string) => link.includes('rel="last"')),
      fp.replace(/.*[?&]page=(\d+).*/, "$1"),
      (result: number) => result || 0
    )(fp.split(",", props.headers.link))
  );
