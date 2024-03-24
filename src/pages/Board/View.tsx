import React, { Suspense, useEffect } from "react";
import {
  json,
  Await,
  defer,
  redirect,
  LoaderFunctionArgs,
  ActionFunctionArgs,
  useRouteLoaderData,
} from "react-router-dom";

import fp from "lodash/fp";

import { RouteLoaderData } from "@/pages/pages.d";
import { sleep, request, parseData, requestDelete } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

import { IssueViewer } from "@/components/Board/View/IssueViewer";
import { IssueViewerButtonGroup } from "@/components/Board/View/IssueViewerButtonGroup";

const Board: React.FC = () => {
  const { category, title, list } = useRouteLoaderData("board-view") as RouteLoaderData;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="p-8">
      <div className="text-2xl text-left">{CATEGORIES[category].title}</div>
      <div className="text-2xl text-left my-8">{title}</div>
      <div className="flex flex-col">
        <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
          <Await resolve={list}>
            {(list) => (
              <>
                <IssueViewer category={category} issue={list[category]} />
                <IssueViewerButtonGroup category={category} issue={list[category]}/>
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default Board;

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
    const response = await request(category, option, issueNumber);

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
  const title = fp.get(`title`, list[category]);

  return defer({
    category: category,
    title: title,
    list: list,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  await sleep();

  const category = params?.category ?? "";
  const formData = await request.formData();

  // Deletion via fetcher
  if (request.method === "DELETE") {
    const issueId : string = String(formData.get("issueId") ?? "");
    if(!issueId) {
      throw json({ message: 'Could not delete issue.' }, { status: 500 });
    }

    const response = await requestDelete(issueId);
    console.log(response);
    return redirect(`/${category}`);
  }

  throw json({ message: 'Could not delete issue.' }, { status: 500 });
}
