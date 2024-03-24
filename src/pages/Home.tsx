import React, { Suspense, useEffect } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import fp from "lodash/fp";

import { ImageCarousel } from "@/components/Home/ImageCarousel";

import { LatestIssuse } from "@/components/Home/LatestIssuse";

import { RouteLoaderData } from "@/pages/pages.d";
import { sleep, request, parseData } from "@/lib/utils";
import { HOME_PER_PAGE, CATEGORIES } from "@/lib/constants";

const Home: React.FC = () => {
  const { title, list } = useRouteLoaderData("home") as RouteLoaderData;

  useEffect(() => {
    document.title = title;
  });

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <Suspense fallback={<div style={{ textAlign: "center" }}>Loading...</div>}>
        <Await resolve={list}>
          {(list) => (
            <>
              <div>
                <ImageCarousel />
              </div>
              <div className="w-full flex flex-row justify-evenly items-center mt-20">
                {fp.map(
                  (category: string) => (
                    <LatestIssuse
                      key={category}
                      category={category}
                      title={CATEGORIES[category].title}
                      list={list[category]}
                    />
                  ),
                  fp.keys(CATEGORIES)
                )}
              </div>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;

const getList = async (
  option: object
): Promise<{
  list: { [key: string]: object };
  status?: number;
  message?: object;
}> => {
  const list: { [key: string]: object } = {};

  try {
    await Promise.all(
      fp.map(async (category) => {
        const response = await request(category, option);

        if (response.status === 200) {
          list[category] = response.data.map((item: object) => parseData(item));
        } else {
          throw new Error("Could not fetch details for selected event.");
        }
      }, fp.keys(CATEGORIES))
    );
  } catch (error) {
    return {
      list: {},
      status: 500,
      message: error ?? "",
    };
  }

  return {list};
};

// 컴포넌트 마다 loader 를 두어, App.js 의 Router 에서 선언한다.
export async function loader() {
  await sleep();

  const { list } = await getList({ per_page: HOME_PER_PAGE });
  // getList 앞에 await 를 주면 event 를 기다렸다가 리스트를 출력한다.
  return defer({
    category: "home",
    title: "홈",
    list: list,
  });
}
