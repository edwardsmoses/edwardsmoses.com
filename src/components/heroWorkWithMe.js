import React from "react";

export const Hero_WorkWithMe = () => {
  return (
    <div className="px-4 pb-16 mx-auto space-y-4 text-center pt-7 max-w-7xl sm:px-6 lg:px-8">
      <p className="max-w-2xl mx-auto mt-0 mb-2 text-lg tracking-tight ">Hi there 👋 — I'm Edwards</p>
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
      <p className="max-w-2xl mx-auto text-xl tracking-tight">
        Whether you're taking your first steps into building your app or you need to improve your existing application,
        I can help. <br /> <br />
        I'm a freelance <b>React/React Native developer</b> and <b>a web & mobile development consultant</b> who works
        with companies in United States, England, and around the world to build and improve their web & mobile presence
        on the internet, Android & iOS. I <span>design MVPs</span>, <span>build software</span>,{" "}
        <span>automate processes</span> to bring <span>new products to market</span> and{" "}
        <span>achieve your business goals</span>.
      </p>
      <div className="flex justify-center mt-10 space-x-6">
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <a
            href="https://calendly.com/edwardsmoses/30min"
            target="blank"
            className="flex items-center justify-center w-full px-8 py-3 text-xl font-medium border border-transparent rounded-md bg-app-brand text-app-brand-white md:py-4 md:text-lg md:px-10 hover:no-underline"
          >
            Book a call. I love to chat!
          </a>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <a
            href="mailto://hi@edwardsmoses.com"
            className="flex items-center justify-center w-full px-8 py-3 text-xl font-medium border border-transparent rounded-md border-app-brand md:py-4 md:text-lg md:px-10"
          >
            Get In Touch {"->"}
          </a>
        </div>
      </div>
    </div>
  );
};
