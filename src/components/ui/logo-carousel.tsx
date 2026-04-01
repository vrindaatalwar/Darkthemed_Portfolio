"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";

export const AnimatedCarousel = ({
  title = "Trusted by thousands of businesses worldwide",
  subTitle = "",
  logoCount = 15,
  autoPlay = true,
  logos = null, // Array of image URLs
  containerClassName = "",
  titleClassName = "",
  carouselClassName = "",
  logoClassName = "",
  itemsPerViewMobile = 4,
  itemsPerViewDesktop = 6,
  spacing = "gap-10",
  padding = "py-20 lg:py-40",
  // New logo size customization props
  logoContainerWidth = "w-48",
  logoContainerHeight = "h-24",
  logoImageWidth = "w-full",
  logoImageHeight = "h-full",
  logoMaxWidth = "",
  logoMaxHeight = "",
}: any) => {
  const logoItems = logos ? [...logos, ...logos] : Array.from({ length: logoCount * 2 }, () => `https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9nb3xlbnwwfHwwfHx8MA%3D%3D`);

  // Combine logo image size classes
  const logoImageSizeClasses = `${logoImageWidth} ${logoImageHeight} ${logoMaxWidth} ${logoMaxHeight}`.trim();

  return (
    <div className={`w-full ${padding} bg-transparent ${containerClassName}`}>
      <div className="container mx-auto">
        <div className={`flex flex-col ${spacing}`}>
          <div className={`text-left ml-2 mb-6 ${titleClassName}`}>
            <h2 className="text-white font-serif tracking-normal text-[26px] mb-2">
              {title}
            </h2>
            {subTitle && (
              <p className="text-[#a3a3a3] font-sans tracking-[-0.03em] text-[15px]">
                {subTitle}
              </p>
            )}
          </div>
          
          <div 
            className="w-full relative"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)'
            }}
          >
            <Carousel 
              opts={{ 
                loop: true,
                dragFree: true,
              }}
              plugins={[
                AutoScroll({
                  playOnInit: autoPlay,
                  speed: 1,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                  startDelay: 0
                })
              ]}
              className={`w-full ${carouselClassName}`}
            >
              <CarouselContent>
                {logoItems.map((logoItem: any, index: number) => {
                  const isString = typeof logoItem === 'string';
                  const imgUrl = isString ? logoItem : logoItem.url;
                  const name = isString ? '' : logoItem.name;
                  const Icon = isString ? null : logoItem.icon;

                  return (
                    <CarouselItem className={`basis-1/${itemsPerViewMobile} lg:basis-1/${itemsPerViewDesktop}`} key={index}>
                      <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
                        <div className={`flex rounded-md ${logoContainerWidth} ${logoContainerHeight} items-center justify-center p-4 border border-transparent ${logoClassName}`}>
                          {Icon ? (
                            <Icon className={`${logoImageSizeClasses} object-contain`} />
                          ) : (
                            <img 
                              src={imgUrl}
                              alt={name || `Logo ${index + 1}`}
                              className={`${logoImageSizeClasses} object-contain`}
                            />
                          )}
                        </div>
                        {name && (
                          <span className="text-[#a3a3a3] font-serif text-[12px]">
                            {name}
                          </span>
                        )}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
