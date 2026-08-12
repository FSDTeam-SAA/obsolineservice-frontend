"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

type Feature = {
  _id: string;
  featureName: string;
  title: string;
  bodyText: string;
  features: string[];
  image?: string;
};

type FeatureResponse = {
  meta?: {
    totalPages?: number;
  };
  data?: {
    features?: Feature[];
  };
};

type SliderImage = {
  src: string;
  alt: string;
};

type ImageSliderProps = {
  images: SliderImage[];
  startIndex: number;
  interval: number;
  priority?: boolean;
};

function ImageSlider({ images, startIndex, interval, priority = false }: ImageSliderProps) {
  const [activeSlide, setActiveSlide] = useState(startIndex % images.length);

  useEffect(() => {
    setActiveSlide((current) => current % images.length);
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % images.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [images.length, interval]);

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
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const getFeatures = async () => {
      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL?.replace(/\/$/, "");
      if (!baseUrl) {
        setError("Backend API URL is not configured.");
        setIsLoading(false);
        return;
      }

      try {
        const getPage = async (page: number) => {
          const response = await fetch(`${baseUrl}/feature?page=${page}&limit=100`, {
            signal: controller.signal,
          });

          if (!response.ok) throw new Error("Failed to load technology data.");
          return (await response.json()) as FeatureResponse;
        };

        const firstPage = await getPage(1);
        const totalPages = firstPage.meta?.totalPages ?? 1;
        const remainingPages = await Promise.all(
          Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => getPage(index + 2)),
        );
        const allFeatures = [firstPage, ...remainingPages].flatMap(
          (page) => page.data?.features ?? [],
        );

        if (!controller.signal.aborted) {
          setFeatures(allFeatures);
          setError(null);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!controller.signal.aborted) {
          setError(error instanceof Error ? error.message : "Failed to load technology data.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    getFeatures();
    return () => controller.abort();
  }, []);

  const sections = features.map((feature) => ({
        id: feature._id,
        eyebrow: feature.featureName,
        title: feature.title,
        description: feature.bodyText,
        features: feature.features,
        image: feature.image,
      }));

  const images = features
    .filter((feature): feature is Feature & { image: string } => Boolean(feature.image))
    .map((feature) => ({ src: feature.image, alt: feature.title }));

  return (
    <section id="services" className="relative overflow-hidden bg-[#f9faff] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-40 top-1/3 size-80 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 size-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto w-full container px-4 sm:px-8 lg:px-12 xl:px-16">
        <h2 className="text-center text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[42px]">
          Technology that <span className="italic text-[#29236c]">works as hard</span> as we do.
        </h2>

        <div className="mt-14 space-y-16 sm:mt-16 lg:space-y-20">
          {isLoading &&
            Array.from({ length: 3 }, (_, index) => (
              <article
                key={index}
                aria-hidden="true"
                className="grid animate-pulse items-center gap-9 lg:grid-cols-2 lg:gap-20"
              >
                <div
                  className={`aspect-[16/10] w-full rounded-xl bg-slate-200 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                />
                <div className={`max-w-xl ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="h-3 w-28 rounded bg-slate-200" />
                  <div className="mt-4 h-7 w-4/5 rounded bg-slate-200" />
                  <div className="mt-3 h-7 w-3/5 rounded bg-slate-200" />
                  <div className="mt-5 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
                  <div className="mt-6 space-y-3">
                    {Array.from({ length: 4 }, (_, item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <div className="size-4 rounded-full bg-slate-200" />
                        <div className="h-3 w-2/5 rounded bg-slate-200" />
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}

          {!isLoading && error && (
            <p role="alert" className="py-12 text-center text-sm text-red-600">{error}</p>
          )}

          {!isLoading && !error && sections.length === 0 && (
            <p className="py-12 text-center text-sm text-slate-500">Technology data not found.</p>
          )}

          {!isLoading && !error && sections.map((section, index) => (
            <article
              key={section.id}
              className="grid items-center gap-9 lg:grid-cols-2 lg:gap-20"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                {images.length ? (
                  <ImageSlider
                    images={images}
                    startIndex={index % images.length}
                    interval={4200 + index * 600}
                    priority={index === 0}
                  />
                ) : (
                  <div className="grid aspect-[16/10] w-full place-items-center rounded-xl bg-slate-200 text-sm text-slate-500 shadow-[0_18px_45px_rgba(45,70,120,0.14)]">
                    Image not found.
                  </div>
                )}
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
