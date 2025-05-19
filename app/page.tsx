import Image from "next/image";
import Aurora from "./blocks/Backgrounds/Aurora/Aurora";
import Hero from "./sections/Hero";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { Bento } from "./sections/Bento";
import { Footer } from "./sections/Footer";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <main className="max-w-screen">
      <section className=" h-screen bg-black relative" >
        <div className="absolute inset-0">
          <Aurora />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <Hero />
        </div>
      </section>
      <section className="flex flex-col items-center justify-center mb-20">
        <div className="relative flex flex-col size-full items-center justify-center overflow-hidden rounded-lg bg-background p-20">
          <p className="text-7xl font-bold z-20">The next app </p>
          <br />
          <div className="w-4xl">
            <HeroVideoDialog
              className=" dark:hidden z-20"
              animationStyle="from-center"
              videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
              thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
              thumbnailAlt="Hero Video"
            />
          </div>      <GridPattern
            width={50}
            height={50}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] z-10",
            )}
          />
        </div>

      </section>
      <section className="max-w-screen flex flex-col items-center justify-center ">
        <p className="text-7xl font-bold">The next app </p>
        <br />
        <Carousel>
          <CarouselContent className="w-2xl h-2xl">
            <CarouselItem >
              <img
                src="https://placehold.co/600x400"
                alt="Image"
                className="object-cover w-full h-full rounded-2xl"
              />

            </CarouselItem>
            <CarouselItem >
              <img
                src="https://placehold.co/600x400"
                alt="Image"
                className="object-cover w-full h-full rounded-2xl"
              />

            </CarouselItem>
            <CarouselItem >
              <img
                src="https://placehold.co/600x400"
                alt="Image"
                className="object-cover w-full h-full rounded-2xl"
              />

            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      </section>
      <section >
        <Bento />
      </section>
      <Footer />
    </main>
  );
}
