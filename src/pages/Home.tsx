import { useState } from "react";
import { Button } from "@/components/ui/button";

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full">
      <Button onClick={() => setCount((count) => count + 1)}>{count}</Button>
    </div>
  );
}

export default Home;
