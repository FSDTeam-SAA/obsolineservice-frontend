"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "/images/hospitality/property-aerial.png",
    alt: "Aerial view of a premium vacation property community",
  },
  {
    src: "/images/hospitality/property-villa.png",
    alt: "Luxury vacation villa and swimming pool",
  },
  {
    src: "/images/hospitality/property-coastal.png",
    alt: "Boutique coastal vacation homes overlooking the sea",
  },
];

const sections = [
  {
    eyebrow: "Guest Experience",
    title: "Exceptional stays start with exceptional communication.",
    description:
      "Our AI-powered messaging platform handles every guest touchpoint — pre-arrival, check-in, and post-stay review requests.",
    features: [
      "Automated pre-arrival messages",
      "Smart FAQ responses",
      "Check-in coordination",
      "Review request sequences",
    ],
  },
  {
    eyebrow: "Revenue Intelligence",
    title: "Dynamic pricing that never leaves money on the table.",
    description:
      "Our pricing engine monitors 40+ market signals: demand trends, events, competitor rates, and seasonality to set the optimal rate every night.",
    features: [
      "Real-time market monitoring",
      "Automated rate adjustments",
      "RevPAR tracking",
      "30-day forward forecasting",
    ],
  },
  {
    eyebrow: "Operations",
    title: "Seamless operations, zero surprises.",
    description:
      "From housekeeping schedules to maintenance ticketing and vendor management — every task is tracked and reported in real time.",
    features: [
      "Automated cleaning scheduling",
      "Maintenance ticketing",
      "Vendor portal",
      "Real-time status updates",
    ],
  },
];

type ImageSliderProps = {
  startIndex: number;
  interval: number;
  priority?: boolean;
};

function ImageSlider({ startIndex, interval, priority = false }: ImageSliderProps) {
  const [activeSlide, setActiveSlide] = useState(startIndex);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % images.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [interval]);

  const showPrevious = () => {
    setActiveSlide((current) => (current - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setActiveSlide((current) => (current + 1) % images.length);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Property gallery"
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-200 shadow-[0_18px_45px_rgba(45,70,120,0.14)]"
    >
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={priority && index === startIndex}
          sizes="(max-width: 1024px) 100vw, 530px"
          className={`object-cover transition-all duration-1000 ease-in-out ${
            activeSlide === index
              ? "z-10 scale-100 opacity-100"
              : "pointer-events-none z-0 scale-105 opacity-0"
          }`}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous property image"
        className="absolute left-3 top-1/2 z-30 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#29236c] opacity-100 shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
      >
        <ChevronLeft aria-hidden="true" size={17} />
      </button>
      <button
        type="button"
        onClick={showNext}
        aria-label="Next property image"
        className="absolute right-3 top-1/2 z-30 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#29236c] opacity-100 shadow-md backdrop-blur transition-all hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
      >
        <ChevronRight aria-hidden="true" size={17} />
      </button>

      <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 gap-1.5 rounded-full bg-slate-950/20 px-2.5 py-2 backdrop-blur-sm">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={activeSlide === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeSlide === index ? "w-5 bg-white" : "w-1.5 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Technology() {
  return (
    <section id="services" className="relative overflow-hidden bg-[#f9faff] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 size-80 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 size-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto w-full container px-4 sm:px-8 lg:px-12 xl:px-16">
        <h2 className="text-center text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[42px]">
          Technology that <span className="italic text-[#29236c]">works as hard</span> as we do.
        </h2>

        <div className="mt-14 space-y-16 sm:mt-16 lg:space-y-20">
          {sections.map((section, index) => (
            <article
              key={section.eyebrow}
              className="grid items-center gap-9 lg:grid-cols-2 lg:gap-20"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                <ImageSlider
                  startIndex={index}
                  interval={4200 + index * 600}
                  priority={index === 0}
                />
              </div>

              <div className={`max-w-xl ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5369a6]">
                  {section.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] text-slate-950 sm:text-[28px]">
                  {section.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {section.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {section.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-xs text-slate-700 sm:text-sm">
                      <span className="grid size-4 shrink-0 place-items-center rounded-full border border-[#7180ad]/50 text-[#29236c]">
                        <Check aria-hidden="true" size={9} strokeWidth={2.5} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Technology;
