import React from "react";
import { useABTest } from "../hooks/useABTest";

export const Hero_WorkWithMe = () => {
  const hiCopy = {
    "versionOriginal": "Hi there! 👋 Welcome — I'm Edwards",
    "versionA": "Hi there! 👋 Welcome — I'm Edwards. I help companies build and design software.",
    "versionB": "Hi there! 👋 Welcome — I'm Edwards. Let's work together today",
    "versionC": "Hi there! 👋 Welcome — I'm Edwards. I'm available for hire!",
    "versionD": "👋 Hi, I'm Edwards, a Certified Google Cloud Professional Cloud Developer. Let's work together",
    "versionE": "👋 Hi, I'm Edwards, a Certified Stripe Professional Developer. Let's work together",
    "versionF":
      "👋 Hi there! Welcome, I'm Edwards, a Certified Google and Stripe Professional Developer. Let's work together",
  };

  const { copyVersion: hiCopyVersion, handleTrackEvent: handleTrackEventHiCopy } = useABTest({
    "versionOriginal": "onPageLoadHiOriginal",
    "versionA": "onPageLoadHiThere",
    "versionB": "onPageLoadHiThereLetsWorkTogether",
    "versionC": "onPageLoadHiThereHireMe",
    "versionD": "onPageLoadHiThereGoogleCloud",
    "versionE": "onPageLoadHiThereStripe",
    "versionF": "onPageLoadHiThereGoogleCloudAndStripe",
  });

  const bookButtonCopy = {
    "versionOriginal": "Book a call. I love to chat!",
    "versionA": "Book a call. Let's chat!",
    "versionB": "Book a call. Let's work together!",
    "versionC": "Book a call. I'm available for hire!",
    "versionD": "Book a call. Let's learn about your project!",
    "versionE": "Hire me today!",
  };

  const { copyVersion: bookButtonCopyVersion, handleTrackEvent: handleTrackEventBookButtonCopy } = useABTest({
    "versionOriginal": "onBookCallButtonClickedOriginal",
    "versionA": "onBookCallButtonClickedLetsChat",
    "versionB": "onBookCallButtonClickedLetsWorkTogether",
    "versionC": "onBookCallButtonClickedHireMe",
    "versionD": "onBookCallButtonClickedLetsLearnAboutYourProject",
    "versionE": "onBookCallButtonClickedHireMeToday",
  });

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
      <p className="max-w-2xl mx-auto text-xl tracking-tight prose dark:prose-invert">
        Whether you're taking your first steps into building your app or you need to improve your existing application,
        I can help. <br /> <br />
        I'm a freelance <b>React/React Native developer</b> and <b>a web & mobile development consultant</b> who works
        with companies in United States, Europe, and around the world to build and improve their web & mobile presence
        on the internet, Android & iOS. I <span>design MVPs</span>, <span>build software</span>,{" "}
        <span>automate processes</span> to bring <span>new products to market</span> and{" "}
        <span>achieve your business goals</span>.
      </p>
      <div className="flex flex-col justify-center mt-10 space-x-0 space-y-3 md:flex-row md:space-x-3 md:space-y-0">
        <div className="">
          <a
            href="https://calendly.com/edwardsmoses/30min"
            target="blank"
            onClick={() => {
              handleTrackEventBookButtonCopy();
              handleTrackEventHiCopy();
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
