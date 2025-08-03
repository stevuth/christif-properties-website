"use client";

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <div className="overflow-hidden rounded-lg">
                <div className="aspect-video relative">
                    <Image
                        src={src}
                        alt={`${title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint="house interior"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                        priority={index === 0}
                    />
                </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16 hidden sm:flex" />
      <CarouselNext className="mr-16 hidden sm:flex" />
    </Carousel>
  );
}
