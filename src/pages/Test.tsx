import type { ActionFunctionArgs } from "react-router-dom";
import { sleep } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Test() {
  const helloHandler = () => {
    alert("Hello, World!");
  };

  return (
    <>
      <div className="w-full m-2 bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
        <Button onClick={helloHandler}>Test2</Button>
      </div>
    </>
  );
}

export default Test;

export async function action({ request }: ActionFunctionArgs) {
  await sleep();

  const formData = await request.formData();

  console.info(formData);

  return new Response(null, {
    status: 302,
    headers: { Location: "/test" },
  });
}
