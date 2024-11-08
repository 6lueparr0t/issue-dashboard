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
import { sleep, requestCreate } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";
import { IssueEditor } from "@/components/Board/Common/IssueEditor";

const BoardNewPage: React.FC = () => {
  const { category, title } = useRouteLoaderData("board-new") as RouteLoaderData;

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
        <IssueEditor category={category} method={"POST"} />
      </div>
    </div>
  );
};

export default BoardNewPage;

export async function loader({ params }: LoaderFunctionArgs) {
  await sleep();

  const category = params?.category ?? "";
  if (fp.has(category, CATEGORIES) === false) {
    return redirect("/");
  }
  return defer({
    category: category,
    title: "글쓰기",
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  await sleep();

  const category = params?.category ?? "";
  const formData = await request.formData();

  if (request.method === "POST") {
    const title: string = String(formData.get("title") ?? "");
    const body: string = String(formData.get("body") ?? "");

    if (!title || !body) {
      throw json({ message: `Title(${title}) or Body(${body}) is missing.` }, { status: 500 });
    }

    const response = await requestCreate(category, { title: title, body: body });
    if (response?.status !== 201) {
      throw json({ message: "Could not create issue." }, { status: response?.status ?? 500 });
    }

    const issueNumber = response.data.number;
    return redirect(`/${category}/${issueNumber}`);
  }

  throw json({ message: "Could not create issue." }, { status: 500 });
}
