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
    <div className="hero-intro">
      <p className="hero-eyebrow">{hiCopy[hiCopyVersion]}</p>
      <h1
        className="max-w-4xl mx-auto mt-0 text-5xl font-medium tracking-tight text-balance font-display sm:text-6xl"
        style={{ lineHeight: 1.1 }}
      >
        I ship React and React Native apps that{" "}
        <span className="relative text-app-brand-yellow dark:text-[#d8bb7b]">
          <span className="relative">make it to production</span>
        </span>
        : Stripe, auth, stores, and the features that come after launch.
      </h1>
      <p className="max-w-3xl mx-auto text-xl leading-8 tracking-tight text-pretty text-zinc-700 dark:text-zinc-200">
        I'm a freelance <b>developer</b> and <b>a web & mobile development consultant</b> who works with companies
        around the world to build and improve their web & mobile presence on the internet, <b>Android</b> & <b>iOS</b>.
        <br /> <br />
        {excerptCopy[excerptCopyVersion]}
      </p>
      <div className="hero-actions">
        <div>
          <a
            href="https://calendly.com/edwardsmoses/30min"
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              handleTrackEventBookButtonCopy();
              handleTrackEventHiCopy();
              handleTrackEventExcerptCopy();
            }}
            className="action-link action-link--primary"
          >
            {bookButtonCopy[bookButtonCopyVersion]}
          </a>
        </div>
        <div>
          <a
            href="mailto:hi@edwardsmoses.com"
            className="action-link action-link--secondary"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
