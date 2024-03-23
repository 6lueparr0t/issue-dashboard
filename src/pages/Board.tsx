import React, { Suspense, useEffect } from "react";
import {
  Await,
  defer,
  redirect,
  ActionFunctionArgs,
  LoaderFunctionArgs,
  useRouteLoaderData,
} from "react-router-dom";
import fp from "lodash/fp";

import { RouteLoaderData } from "@/pages/pages.d";
import { sleep, request, search, parseData, parseTotalCount } from "@/lib/utils";
import { CATEGORIES, PER_PAGE } from "@/lib/constants";

const Board: React.FC = () => {
  const { category, title, list, total, page } = useRouteLoaderData("board") as RouteLoaderData;

  useEffect(() => {
    document.title = title;
  }, [title]);

  console.log("category : ", category);
  console.log("list : ", list);
  console.log("total : ", total);
  console.log("page : ", page);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-8">
        <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
          <Await resolve={list}>
            {(list) => (
              <>
                <div className="w-full flex flex-row justify-evenly items-center mt-20">
                  {/* {list[category].length} */}
                </div>
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export default Board;

const getList = async (
  category: string,
  query: { keyword: string; in: string } = { keyword: "", in: "title" },
  option: object = {}
): Promise<{
  list: { [key: string]: object };
  total: number;
  status?: number;
  message?: object;
}> => {
  const list: { [key: string]: object } = {};

  let total: number = 0;

  try {
    let response;
    if (fp.get("keyword", query) !== "") {
      response = await search(category, query, option);

      if (response.status === 200) {
        total = parseTotalCount(response);
        list[category] = response.data.items.map((item: object) => parseData(item));
      }
    } else {
      response = await request("get", category, option);
      if (response.status === 200) {
        total = parseTotalCount(response);
        list[category] = response.data.map((item: object) => parseData(item));
      }
    }

    if (response.status !== 200) throw new Error("Could not fetch details for selected event.");
  } catch (error) {
    return {
      list: {},
      total: 0,
      status: 500,
      message: error ?? "",
    };
  }

  return { list: list, total: total };
};

// 컴포넌트 마다 loader 를 두어, App.js 의 Router 에서 선언한다.
export async function loader({ request, params }: LoaderFunctionArgs) {
  await sleep();

  const category = params?.category ?? "";
  if (fp.has(category, CATEGORIES) === false) {
    return redirect("/");
  }

  const searchParams = new URL(request.url).searchParams;

  const query = {
    keyword: searchParams.get("keyword") ?? "",
    in: searchParams.get("in") ?? "title",
  };
  const page: number = Number(searchParams.get("page") ?? 1);

  const title = fp.get(`${category}.title`, CATEGORIES);

  const { list, total } = await getList(category, query, { per_page: PER_PAGE });

  return defer({
    category: category,
    title: title,
    list: list,
    total: total,
    page: page,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  await sleep();

  const method = request.method;
  const data = await request.formData();

  return new Response(null, {
    status: 302,
    headers: { Location: "/qna" },
  });
}
