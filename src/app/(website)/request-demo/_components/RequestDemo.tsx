"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const inputStyles =
  "h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#4a43a1] focus:ring-2 focus:ring-[#4a43a1]/15";

function Field({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-800">
        {label}
      </label>
      <input id={id} name={id} type={type} placeholder={placeholder} required className={inputStyles} />
    </div>
  );
}

function NumberField({ id, label }: { id: string; label: string }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-slate-800">
        {label}
      </label>
      <input id={id} name={id} type="number" min="0" defaultValue="0" className={inputStyles} />
    </div>
  );
}

function RequestDemo() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#f8f9fd] py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-40 top-1/2 size-96 -translate-y-1/2 rounded-full bg-blue-100/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-indigo-100/35 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-start gap-12 px-4 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-12">
        <div className="max-w-lg lg:sticky lg:top-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#5369a6]">Let&apos;s grow together</p>
          <h1 className="text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-[54px]">
            Request a Demo
          </h1>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Discover how Booking Is Yours can support your next vacation rental project. Request a personalized consultation and learn more about our services, process, and project approach.
          </p>

          <div className="mt-8 space-y-3 text-sm text-slate-700">
            {["A tailored property growth plan", "A walkthrough of our management platform", "Clear answers from a hospitality expert"].map((benefit) => (
              <p key={benefit} className="flex items-center gap-3">
                <CheckCircle2 aria-hidden="true" size={17} className="shrink-0 text-[#29236c]" />
                {benefit}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border p-5 shadow-[0_22px_60px_rgba(35,51,95,0.10)] backdrop-blur-sm sm:p-7 lg:p-8">
          {isSubmitted ? (
            <div role="status" className="flex min-h-[480px] flex-col items-center justify-center px-4 text-center">
              <span className="grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
                <CheckCircle2 aria-hidden="true" size={32} />
              </span>
              <h2 className="mt-5 text-2xl font-semibold text-slate-950">Thank you for reaching out!</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                We&apos;ve received your request. A member of our team will contact you shortly to arrange your personalized demo.
              </p>
              <button type="button" onClick={() => setIsSubmitted(false)} className="mt-6 text-sm font-semibold text-[#29236c] hover:underline">
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="name" label="Name" placeholder="Enter your full name" />
                <Field id="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" />
                <Field id="email" label="Email" type="email" placeholder="Enter your email address" />
                <Field id="location" label="Location" placeholder="City or country" />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <NumberField id="holidayHomes" label="Holiday homes" />
                <NumberField id="campingPitches" label="Camping pitches" />
                <NumberField id="rooms" label="Rooms" />
              </div>

              <fieldset>
                <legend className="mb-2 text-xs font-medium text-slate-800">
                  Are you renting out on behalf of other owners?
                </legend>
                <div className="flex items-center gap-6">
                  {["Yes", "No"].map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input type="radio" name="otherOwners" value={option.toLowerCase()} required className="size-4 accent-[#29236c]" />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="desiredDate" label="Desired date" type="date" placeholder="Select date" />
                <Field id="preferredTime" label="What time do you prefer?" type="time" placeholder="Select time" />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-800">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Write your message here..." className="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#4a43a1] focus:ring-2 focus:ring-[#4a43a1]/15" />
              </div>

              <div className="flex justify-center pt-1">
                <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-[#29236c] px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(41,35,108,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#1e1957] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#29236c] focus-visible:ring-offset-2">
                  Send Request
                  <ArrowRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default RequestDemo;
