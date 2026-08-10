"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What services do you provide?",
    answer:
      "We provide complete vacation rental management, including property onboarding, guest communication, booking optimization, dynamic pricing, maintenance coordination, and detailed performance reporting.",
  },
  {
    question: "Do you work with both individual owners and property portfolios?",
    answer:
      "Yes. We support individual vacation-home owners as well as professional operators with growing property portfolios, tailoring our service to each owner's goals.",
  },
  {
    question: "Can I request a free property performance estimate?",
    answer:
      "Absolutely. Our team can review your property, local demand, seasonal trends, and comparable listings to prepare a complimentary revenue opportunity estimate.",
  },
  {
    question: "What does your onboarding process look like?",
    answer:
      "We begin with a property review and custom strategy, then configure listings, pricing, guest communication, operational workflows, and reporting before your launch.",
  },
  {
    question: "How do you handle maintenance and guest support?",
    answer:
      "Our team coordinates trusted local vendors, tracks maintenance requests in real time, and provides responsive guest communication throughout every stay.",
  },
];

function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-[#fafbff] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1240px] items-center gap-14 px-4 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-12">
        <div className="relative mx-auto w-full max-w-[480px] pb-8 pl-6 pt-5 sm:pl-10 sm:pt-8 lg:mx-0">
          <div className="absolute bottom-[18%] left-0 top-0 w-[84%] rounded-lg bg-[#29236c]" />
          <div className="relative aspect-[1.34/1] overflow-hidden rounded-xl bg-slate-200 shadow-[0_20px_45px_rgba(35,45,90,0.18)]">
            <Image
              src="/images/hospitality/property-aerial.png"
              alt="Aerial view of a professionally managed vacation property community"
              fill
              sizes="(max-width: 1024px) 90vw, 480px"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 to-transparent" />
          </div>
        </div>

        <div>
          <h2 className="text-balance text-3xl font-bold leading-tight tracking-[-0.035em] text-slate-950 sm:text-4xl lg:text-[42px]">
            Frequently Asked <span className="italic text-[#29236c]">Questions</span>
          </h2>

          <div className="mt-7 border-t border-slate-300/80">
            {faqs.map((faq, index) => {
              const isOpen = openItem === index;
              const contentId = `faq-content-${index}`;
              const triggerId = `faq-trigger-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`border-b border-slate-300/80 transition-colors duration-300 ${
                    isOpen ? "bg-white/35" : "hover:bg-white/25"
                  }`}
                >
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      onClick={() => setOpenItem(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 py-4 text-left text-sm font-medium text-slate-900 transition-colors hover:text-[#29236c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#29236c]"
                    >
                      <span>{faq.question}</span>
                      <span
                        aria-hidden="true"
                        className={`grid size-7 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 bg-[#29236c] text-white"
                            : "rotate-0 bg-slate-200/70 text-slate-600"
                        }`}
                      >
                        <Plus size={15} strokeWidth={1.8} />
                      </span>
                    </button>
                  </h3>

                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={triggerId}
                    aria-hidden={!isOpen}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`max-w-[95%] text-xs leading-5 text-slate-500 transition-[transform,padding] duration-500 ease-in-out sm:text-[13px] sm:leading-6 ${
                          isOpen ? "translate-y-0 pb-5" : "-translate-y-2 pb-0"
                        }`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
