import React, { Suspense, useEffect } from "react";
import {
  Link,
  Await,
  defer,
  redirect,
  LoaderFunctionArgs,
  useRouteLoaderData,
} from "react-router-dom";
import fp from "lodash/fp";

import { RouteLoaderData } from "@/pages/pages.d";
import { sleep, request, search, parseData, parseLastPage, makeQuery } from "@/lib/utils";
import { CATEGORIES, PER_PAGE } from "@/lib/constants";

import { Button } from "@/components/ui/button";

import { SearchInput } from "@/components/Board/SearchInput";
import { IssueTable } from "@/components/Board/IssueTable";
import { IssuePagination } from "@/components/Board/IssuePagination";

const Board: React.FC = () => {
  const { category, title, list, query, last, page } = useRouteLoaderData(
    "board"
  ) as RouteLoaderData;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="p-8">
      <div className="text-2xl text-left">{CATEGORIES[category].title}</div>
      <div className="my-4 flex flex-row gap-4 justify-between">
        <SearchInput />
        <div>
          <Link to="/home">
            <Button>글쓰기</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
      <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
          <Await resolve={list}>
            {(list) => (
              <>
                <IssueTable category={category} list={list[category]} />
              </>
            )}
          </Await>
        </Suspense>
        <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
          <Await resolve={last}>
            {(last) => (
              <>
                <div className="w-full flex flex-col justify-evenly items-center mt-20">
                  {list[category].length > 0 ? <></> : <>등록된 게시글이 없습니다.</>}
                  {list[category].length > 0 && (
                    <IssuePagination
                      category={category}
                      last={last}
                      page={page ?? 1}
                      query={query}
                    />
                  )}
                </div>
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
  query: { keyword: string; in: string } = { keyword: "", in: "title" },
  option: { page?: number; per_page?: number } = {}
): Promise<{
  list: { [key: string]: object };
  last: number;
  status?: number;
  message?: object;
}> => {
  const list: { [key: string]: object } = {};

  let last: number = 0;

  try {
    let response;

    if (fp.get("keyword", query) !== "") {
      response = await search(category, query, option);

      if (response.status === 200) {
        last = parseLastPage(response);
        list[category] = response.data.items.map((item: object) => parseData(item));
      }
    } else {
      response = await request("get", category, option);

      if (response.status === 200) {
        last = parseLastPage(response);
        list[category] = response.data.map((item: object) => parseData(item));
      }
    }

    if (response.status !== 200) throw new Error("Could not fetch details for selected event.");
  } catch (error) {
    return {
      list: {},
      last: 0,
      status: 500,
      message: error ?? "",
    };
  }

  return { list: list, last: last };
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

  const { list, last } = await getList(category, query, { page: page, per_page: PER_PAGE });

  return defer({
    category: category,
    title: title,
    list: list,
    query: query.keyword === "" ? "" : makeQuery(query),
    last: last ? last : page, // last 가 없는 경우, 현재 페이지가 last
    page: page,
  });
}
