import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const ImageCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(4);

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
      className="w-full max-w-xs"
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
        {Array.from({ length: count }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="shadow-none">
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center mt-4">
        {Array.from({ length: count }).map((_, index) => (
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
