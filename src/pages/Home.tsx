import React, { useEffect } from "react";
import { ImageCarousel } from "@/components/Home/ImageCarousel";

type HomeProps = {
  title: string;
};

const Home: React.FC<HomeProps> = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div className="w-full flex justify-center items-center p-8">
      <ImageCarousel />
      {/* 질문 게시판 */}
      {/* 자유 게시판 */}
    </div>
  );
};

export default Home;
