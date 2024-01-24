import React from "react";
import { useABTest } from "../hooks/useABTest";
import { WebsiteCopy } from "../copy/copy-constants";

export const Hero_WorkWithMe = () => {
  const hiCopy = WebsiteCopy.HiWelcome.text_copies;
  const { copyVersion: hiCopyVersion, handleTrackEvent: handleTrackEventHiCopy } = useABTest(
    WebsiteCopy.HiWelcome.tracked_events
  );

  const bookButtonCopy = WebsiteCopy.BookButton.text_copies;
  const { copyVersion: bookButtonCopyVersion, handleTrackEvent: handleTrackEventBookButtonCopy } = useABTest(
    WebsiteCopy.BookButton.tracked_events
  );

  const excerptCopy = WebsiteCopy.HeroExcerpt.text_copies;
  const { copyVersion: excerptCopyVersion, handleTrackEvent: handleTrackEventExcerptCopy } = useABTest(
    WebsiteCopy.HeroExcerpt.tracked_events
  );

  return (
    <div className="px-4 pb-16 mx-auto space-y-4 text-center pt-7 max-w-7xl sm:px-6 lg:px-8">
      <p className="max-w-2xl mx-auto mt-0 mb-2 text-lg tracking-tight ">{hiCopy[hiCopyVersion]}</p>
      <h1
        className="max-w-4xl mx-auto mt-0 text-5xl font-medium tracking-tight font-display sm:text-7xl"
        style={{ lineHeight: 1.1 }}
      >
        I help companies{" "}
        <span className="relative text-app-brand-yellow whitespace-nowrap">
          <span className="relative ml-2">build and design</span>
        </span>{" "}
        software.
      </h1>
      <p className="max-w-3xl mx-auto text-xl tracking-tight prose dark:prose-invert">
        I'm a freelance <b>developer</b> and <b>a web & mobile development consultant</b> who works with companies
        around the world to build and improve their web & mobile presence on the internet, <b>Android</b> & <b>iOS</b>.
        <br /> <br />
        {excerptCopy[excerptCopyVersion]}
      </p>
      <div className="flex flex-col justify-center mt-10 space-x-0 space-y-3 md:flex-row md:space-x-3 md:space-y-0">
        <div className="">
          <a
            href="https://calendly.com/edwardsmoses/30min"
            target="blank"
            onClick={() => {
              handleTrackEventBookButtonCopy();
              handleTrackEventHiCopy();
              handleTrackEventExcerptCopy();
            }}
            className="flex items-center justify-center w-full px-8 py-3 text-xl font-medium border border-transparent rounded-md bg-app-brand text-app-brand-white md:py-4 md:text-lg md:px-10 hover:no-underline hover:opacity-80"
          >
            {bookButtonCopy[bookButtonCopyVersion]}
          </a>
        </div>
        <div>
          <a
            href="mailto://hi@edwardsmoses.com"
            className="flex items-center justify-center w-full px-8 py-3 text-xl font-medium border border-transparent rounded-md border-app-brand md:py-4 md:text-lg md:px-10 hover:no-underline hover:opacity-80"
          >
            Get In Touch {"->"}
          </a>
        </div>
      </div>
    </div>
  );
};
