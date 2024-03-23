import React, { useState, useEffect } from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const IMAGES:string[] = [
  'https://picsum.photos/id/83/1280/720.jpg',
  'https://picsum.photos/id/987/1280/720.jpg',
  'https://picsum.photos/id/428/1280/720.jpg',
  'https://picsum.photos/id/288/1280/720.jpg',
]

export const ImageCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(IMAGES.length);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
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
        {IMAGES.map((image, index) => (
          <CarouselItem key={index}>
            <div className="border-none shadow-none flex items-center justify-center">
              <img src={image} alt={`Placeholder Image ${index}`}/>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        {IMAGES.map((_, index) => (
          <span
            key={index}
            className={`cursor-pointer inline-block w-3 h-3 rounded-full mx-2 ${
              index + 1 === current ? "bg-gray-100" : "bg-gray-400"
            }`}
            onClick={() => api && api.scrollTo(index)}
          />
        ))}
      </div>
    </Carousel>
  );
};
