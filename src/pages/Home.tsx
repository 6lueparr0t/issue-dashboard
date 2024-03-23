import { RouteLoaderData } from "./pages.d";
import React, { Suspense, useEffect } from "react";
// import { useRouteLoaderData, defer, LoaderFunctionArgs } from "react-router-dom";
import {
  Await,
  defer,
  useRouteLoaderData,
} from "react-router-dom";

import { sleep, request } from "@/lib/utils";
import { ImageCarousel } from "@/components/Home/ImageCarousel";

import fp from "lodash/fp";
import { LatestIssuse } from "@/components/Home/LatestIssuse";

const CATEGORIES: string[] = ["qna", "free"];


const Home: React.FC = () => {
  const { title, list } = useRouteLoaderData("home") as RouteLoaderData;

  useEffect(() => {
    document.title = title;
  });

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <Suspense fallback={<div style={({textAlign : "center"})}>Loading...</div>}>
        <Await resolve={list}>
          {(list) => <>
            <div>
              <ImageCarousel />
            </div>
            <div className="w-full flex flex-row justify-evenly items-center mt-20">
              {/* 질문 게시판 */}
              <LatestIssuse type={"qna"} title={"질문게시판"} list={list.qna}/>
              {/* 자유 게시판 */}
              <LatestIssuse type={"free"} title={"자유게시판"} list={list.free}/>
            </div>
          </>}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;

const getList = async (): Promise<object> => {
  const resultData: { [key: string]: object } = {};

  try {
    await Promise.all(
      CATEGORIES.map(async (category) => {
        const response = await request("get", category, {per_page : 5});
        console.log(response.data);
        if (response.status === 200) {
          resultData[category] = response.data.map((item: object) => ({
            ...fp.pick(["number", "title", "body", "created_at", "updated_at"], item),
            user: fp.pick(["avatar_url", "login"], fp.get("user", item)),
          }));
        } else {
          throw new Error("Could not fetch details for selected event.");
        }
      })
    );
  } catch (error) {
    return {
      status: 500,
      message: error,
    };
  }

  return resultData;
};

// export async function loader({ params }: LoaderFunctionArgs) {
export async function loader() {
  await sleep();

  // getList 앞에 await 를 주면 event 를 기다렸다가 리스트를 출력한다.
  return defer({
    type: "home",
    title: "홈",
    // list: {free : [], qna: []},
    list: await getList(),
  });
}
