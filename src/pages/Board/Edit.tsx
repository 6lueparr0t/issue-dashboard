import React, { useEffect } from "react";
import {
  json,
  defer,
  redirect,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  useRouteLoaderData,
} from "react-router-dom";

import fp from "lodash/fp";

import { RouteLoaderData } from "@/pages/pages.d";
import { sleep, requestList, requestPatch, parseData } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { IssueEditor } from "@/components/Board/Common/IssueEditor";
import { Issue } from "@/components/components";

const BoardEditPage: React.FC = () => {
  const { category, title, list } = useRouteLoaderData("board-edit") as RouteLoaderData;
  const issue : Issue = list[category] as unknown as Issue;

  useEffect(() => {
    document.title = title;
  }, [title]);

  // 새로 고침 시, 경고창 메세지
  const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

  return (
    <div className="p-8 xl:w-1/2 m-auto">
      <div className="text-2xl text-left">게시판</div>
      <div className="flex flex-col">
        <IssueEditor category={category} method={"PATCH"} issue={issue}/>
      </div>
    </div>
  );
};

export default BoardEditPage;

const getList = async (
  category: string,
  option: { page?: number; per_page?: number } = {},
  issueNumber: number
): Promise<{
  list: { [key: string]: object };
  status?: number;
  message?: object;
}> => {
  const list: { [key: string]: object } = {};

  try {
    const response = await requestList(category, option, issueNumber);

    if (response.status === 200) {
      list[category] = parseData(response.data);
    } else {
      throw new Error("Could not fetch details for selected event.");
    }
  } catch (error) {
    return {
      list: {},
      status: 500,
      message: error ?? "",
    };
  }

  return { list: list };
};

export async function loader({ params }: LoaderFunctionArgs) {
  await sleep();

  const category = params?.category ?? "";
  if (fp.has(category, CATEGORIES) === false) {
    return redirect("/");
  }
  const issueNumber: number = Number(params?.issueNumber ?? 0);

  const { list } = await getList(category, {}, issueNumber);

  return defer({
    category: category,
    title: "글쓰기",
    list: list,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  await sleep();

  const category = params?.category ?? "";
  const issueNumber: number = Number(params?.issueNumber ?? 0);
  const formData = await request.formData();

  if (request.method === "PATCH") {
    const title: string = String(formData.get("title") ?? "");
    const body: string = String(formData.get("body") ?? "");

    if (!title || !body) {
      throw json({ message: `Title(${title}) or Body(${body}) is missing.` }, { status: 500 });
    }

    const response = await requestPatch(category, { title: title, body: body }, issueNumber);
    if (response?.status !== 200) {
      throw json({ message: "Could not patch issue." }, { status: response?.status ?? 500 });
    }

    return redirect(`/${category}/${issueNumber}`);
  }

  throw json({ message: "Could not patch issue." }, { status: 500 });
}
