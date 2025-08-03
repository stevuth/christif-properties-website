"use client";

import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

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
            <Card className="overflow-hidden">
                <div className="aspect-video relative">
                    <Image
                        src={src}
                        alt={`${title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        data-ai-hint="house interior"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  );
}
