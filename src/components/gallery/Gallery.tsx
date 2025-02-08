import * as React from "react";
import Image from "next/image";

import { Section } from "@/components/craft";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";

const photos = [
  {
    src: "/images/Jagan.png",
    title: "Bruh",
    description: "Made",
  },
  {
    src: "/images/Kendrick.png",
    title: "2",
    description: "Hi",
  },
  {
    src: "/images/clean.jpg",
    title: "3",
    description: "Lol",
  },
];

export default function ProjectGallery() {
  return (
    <Section>
      <div>
        <h1 className="text-3xl sm:text-4xl text-center font-semibold tracking-tight">
          <span className="text-orange-500">graphic</span>design
        </h1>
      </div>
      <div>
        <Carousel className="mt-6 w-[85%] sm:w-[90%] mx-auto">
          <CarouselContent className="-ml-1">
            {photos.map((photo, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card className="relative overflow-hidden cursor-pointer hover:opacity-50 transition-all">
                    <CardContent className="not-prose flex aspect-square items-center justify-center">
                      <Drawer>
                        <DrawerTrigger asChild>
                          <Image
                            src={photo.src}
                            alt="Presets.com Example Image"
                            width={720}
                            height={480}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </DrawerTrigger>
                        <DrawerContent className="w-[95%]  sm:w-[85%] mx-auto">
                          <div className="mx-auto w-[100%] max-w-xl">
                            <DrawerHeader>
                              <DrawerTitle className="text-center">
                                {photo.title}
                              </DrawerTitle>
                              <DrawerDescription className="text-center">
                                {photo.description}
                              </DrawerDescription>
                            </DrawerHeader>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Image
                                  src={photo.src}
                                  alt="Presets.com Example Image"
                                  width={1280}
                                  height={720}
                                  className="h-full w-full px-2 rounded-lg"
                                />
                              </div>
                              <div className="h-[120px] space-y-2">
                                <h3 className="text-muted-foreground">
                                  {photo.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, aperiam doloribus vel excepturi est vitae.
                                </h3>
                                <div className="flex flex-col">
                                  <h1>a</h1>
                                  <h1>a</h1>
                                </div>
                              </div>
                            </div>
                            <DrawerFooter>
                              <Button>Submit</Button>
                              <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DrawerClose>
                            </DrawerFooter>
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Section>
  );
}
