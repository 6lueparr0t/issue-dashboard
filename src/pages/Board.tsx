import { useEffect, Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
  LoaderFunctionArgs,
  ActionFunctionArgs,
} from "react-router-dom";
import { sleep } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BoardProps {
  // title: string;
}

interface RouteLoaderData {
  type: string;
  title: string;
  // list: {}[];
  // page: {}[];
  // count: {}[];
}

const Board: React.FC<BoardProps> = () => {
  const { type, title } = useRouteLoaderData("type") as RouteLoaderData;

  useEffect(() => {
    document.title = title;
  }, [type]);

  return (
    <>
      <div className="w-full m-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
        <Button
          onClick={() => {
            console.log(import.meta.env.VITE_APP_GIT_URL_QNA);
            console.log(import.meta.env.VITE_APP_GIT_URL_FREE);
            console.log(import.meta.env.VITE_APP_GIT_TOKEN);
            console.log(type);
          }}
        >
          {type}
        </Button>
      </div>
      {/* <Suspense fallback={<p style={({textAlign : "center"})}>Loading...</p>}>
        <Await resolve={type}>
          {(type) => <></>}
        </Await>
      </Suspense> */}
    </>
  );
};

export default Board;

const getTitle = (type: string): string => {
  let title: string = "홈";
  switch (type) {
    case "qna":
      title = "질문게시판";
      break;
    case "free":
      title = "자유게시판";
      break;
  }

  return title;
};

const loadList = async (type: string): Promise<string> => {
  // const response = await fetch(`http://localhost:8080/events/${eventId}`);
  // if (!response.ok) {
  //   return json(
  //     { message: "Could not fetch details for selected event." },
  //     {
  //       status: 500,
  //     }
  //   );
  // } else {
  //   const resData = await response.json();
  //   return resData.event;
  // }
  const response = type;
  return response;
};

// 컴포넌트 마다 loader 를 두어, App.js 의 Router 에서 선언한다.
export async function loader({ params }: LoaderFunctionArgs) {
  await sleep();
  const type: string = String(params.type);

  // loadList 앞에 await 를 주면 event 를 기다렸다가
  // 그 다음 리스트를 출력한다.
  return defer({
    // type: loadList(type),
    type: type,
    title: getTitle(type),
    // list: await loadList(type),
  });
}

export async function action({ request }: ActionFunctionArgs) {
  await sleep();
  const method = request.method;
  const data = await request.formData();

  return new Response(null, {
    status: 302,
    headers: { Location: "/test" },
  });
}
