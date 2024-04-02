import React, { useState, useEffect } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import fp from "lodash/fp";

const IMAGES:string[] = [
  'https://picsum.photos/id/83/1280/720.jpg',
  'https://picsum.photos/id/987/1280/720.jpg',
  'https://picsum.photos/id/428/1280/720.jpg',
  'https://picsum.photos/id/288/1280/720.jpg',
]

export const ImageCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      className="w-full"
      setApi={setApi}
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {fp.map((image) => (
          <CarouselItem key={image}>
            <div className="border-none shadow-none flex items-center justify-center">
              <img src={image} alt={`Placeholder Image ${image}`}/>
            </div>
          </CarouselItem>
        ), IMAGES)}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        {fp.map((num) => (
          <span
            key={num}
            className={`cursor-pointer inline-block w-3 h-3 rounded-full mx-2 ${
              num + 1 === current ? "bg-gray-100" : "bg-gray-400"
            }`}
            onClick={() => api && api.scrollTo(num)}
          />
        ), Array.from({ length: IMAGES.length }, (_, num) => num))}
      </div>
    </Carousel>
  );
};
