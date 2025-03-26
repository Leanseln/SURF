"use client"

import { useRef, useState, useEffect } from "react"
import PropTypes from "prop-types"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, Video, Compass, Shield } from "lucide-react"
import App2 from "../images/I2.png"
import App3 from "../images/I3.png"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

function MobileAppShowcase({ className = "" }) {
  const [api, setApi] = useState(null)
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  const plugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      active: true,
      playOnInit: true,
    }),
  )

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const appFeatures = [
    {
      icon: <Video className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
      title: "Real-Time Live Feed",
      description:
        "Access instantaneous video streaming directly from the S.U.R.F boat, providing comprehensive visual insights during rescue operations.",
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
      title: "AI Debris Detection",
      description:
        "Automated navigation system that identifies and avoids debris, obstacles, and potential hazards using advanced computer vision technology.",
    },
    {
      icon: <Compass className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-blue-600" />,
      title: "Flexible Control Modes",
      description:
        "Switch between autonomous AI-powered navigation and full manual control, giving rescue teams complete flexibility in different scenarios.",
    },
  ]

  return (
    <section id="mobile-app" className={cn("py-16 md:py-24 bg-transparent", className)}>
      <div className="container px-4 md:px-6 max-w-7xl mx-auto">
        {/* Improved Header */}
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-800">S.U.R.F</h2>
          <h3 className="text-lg font-semibold text-blue-800 mb-4 uppercase tracking-widest">Control Platform</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center max-w-3xl mx-auto px-2">
            Revolutionizing flood rescue with real-time video streaming, AI-powered navigation, and comprehensive manual
            control capabilities.
          </p>
        </div>

        {/* Mobile App Showcase */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Phone Showcase */}
          <div className="w-full lg:w-1/2 relative max-w-md mx-auto">
            <Carousel
              setApi={setApi}
              className="w-full"
              plugins={[plugin.current]}
              opts={{
                align: "center",
                loop: true,
              }}
            >
              <CarouselContent className="py-4">
                <CarouselItem className="flex justify-center">
                  <Card className="border-0 shadow-2xl bg-transparent">
                    <CardContent className="p-0 flex justify-center">
                      <div className="relative w-[250px] h-[500px] overflow-hidden ">
                        <img
                          src={App2 || "/placeholder.svg"}
                          alt="S.U.R.F App Interface"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem className="flex justify-center">
                  <Card className="border-0 shadow-2xl bg-transparent">
                    <CardContent className="p-0 flex justify-center">
                      <div className="relative w-[250px] h-[500px] overflow-hidden">
                        <img
                          src={App3 || "/placeholder.svg"}
                          alt="S.U.R.F Rescue Coordination"
                          className="w-full h-full object-contain "
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>

              <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2 py-4">
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-colors",
                      current === i ? "bg-blue-600" : "bg-gray-300",
                    )}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <CarouselPrevious
                className="hidden lg:flex -left-12 h-12 w-12 bg-blue-500/10 hover:bg-blue-500/20 border-none"
                icon={<ChevronLeft className="h-6 w-6 text-blue-600" />}
              />
              <CarouselNext
                className="hidden lg:flex -right-12 h-12 w-12 bg-blue-500/10 hover:bg-blue-500/20 border-none"
                icon={<ChevronRight className="h-6 w-6 text-blue-600" />}
              />
            </Carousel>

            <div className=" justify-center mt-8 hidden lg:block gap-4">
              <button
                onClick={() => api?.scrollPrev()}
                className="rounded-full p-2 bg-blue-100/50 hover:bg-blue-100 transition-colors sm:hidden"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6 text-blue-600" />
              </button>
              <button
                onClick={() => api?.scrollNext()}
                className="rounded-full p-2 bg-blue-100/50 hover:bg-blue-100 transition-colors sm:hidden"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6 text-blue-600" />
              </button>
            </div>
          </div>

          {/* Features Description - Updated to hide icon on small screens */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            {appFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:items-center text-center sm:text-center lg:text-left lg:items-start lg:flex-row">
                  <div className="hidden lg:block mb-3 sm:mb-4 lg:mb-0 lg:mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-blue-800">{feature.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// PropTypes for className validation
MobileAppShowcase.propTypes = {
  className: PropTypes.string,
}

export default MobileAppShowcase