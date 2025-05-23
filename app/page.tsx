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
import { Bento } from "./sections/Bento";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";
export default function Home() {
  return (
    <main className="max-w-screen overflow-x-hidden">
      <section className="h-screen bg-black relative" >
        <div className="absolute inset-0 top-0">
          <Aurora />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full pt-16 sm:pt-0">
          <Hero />
        </div>
      </section>
      <section className="max-w-screen flex flex-col items-center justify-center py-12 md:py-24">
        <div className="relative flex flex-col size-full items-center justify-center overflow-hidden rounded-lg bg-background p-8 md:p-20">
          <GridPattern
            width={50}
            height={50}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] z-10",
            )}
          />
        </div>
        <p className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 px-4 text-center">Preview </p>
        <div className="w-full max-w-5xl mx-auto px-4">
          <Carousel className="w-full" 
          opts={{
          align: "center", 
        }}>
          <CarouselContent className="w-full max-w-4xl">
            <CarouselItem className="flex items-center justify-center p-4">
              <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full flex items-center justify-center">
                <img
                  src="/img (1).png"
                  alt="Image"
                  className="object-contain max-h-full max-w-full rounded-2xl"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="flex items-center justify-center p-4">
              <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full flex items-center justify-center">
                <img
                  src="/img (2).png"
                  alt="Image"
                  className="object-contain max-h-full max-w-full rounded-2xl"
                />
              </div>
            </CarouselItem>
            <CarouselItem className="flex items-center justify-center p-4">
              <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full flex items-center justify-center">
                <img
                  src="/img (3).png"
                  alt="Image"
                  className="object-contain max-h-full max-w-full rounded-2xl"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        </div>
      </section>
      <section className="px-4">
        <Bento />
      </section>
    </main>
  );
}
