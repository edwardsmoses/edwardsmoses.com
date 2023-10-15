import React from "react";
import { OutboundLink } from "gatsby-plugin-google-gtag"

import "./css/testimonial.css";

const testimonials = [
  [
    {
      content:
        "Edwards is very professional. One of the best coders we hired to help us out with a project that needed a lot of help. He gave us detailed documentations and walk through for every milestone of the project. Very communicative and I will 100 percent recommend Edwards!",
      author: {
        name: "Maeda Hanafi",
        role: "Engineer at Appsmith",
        link: "https://www.upwork.com/freelancers/~013da23dfa6724ea97?viewMode=1",
      },
    },
    {
      content:
        "I worked with Edwards for more than 4 years, on so many projects ranging from educational web apps, supply chain apps to networking. He has delivered a very commendable job, specifically paying detailed attention to software design and project directions.",
      author: {
        name: "Nureni Awayewaserere",
        role: "CEO at RedoxCorp",
        link: "https://www.linkedin.com/in/zhul-nuraen-awayewaserere-4910b988/",
      },
    },
  ],
  [
    {
      content:
        "Anytime a new development challenge arose, Edwards was the one to tackle it. Annotations, custom CRMs, emails, CI/CD, Stripe subscriptions, uber-like queue system, notifications, in-app messaging, PDF generation, etc. He did it all when I couldn't. Your team would be lucky to have Edwards and I urge you to reach out.",
      author: {
        name: "Matt Ruiz",
        role: "Founder of TrouthouseTech",
        link: "https://twitter.com/MatthewZRuiz/status/1549772556835733504",
      },
    },
    {
      content:
        "Edwards was great on many levels. Very good and broad skill set, flexibility, communication, and self-management. He was proactively looking for work rather than waiting for the next task and finding better solutions than we anticipated. He was very transparent and updated us about all steps every day so there was never the question of what work has been done. The team was very happy working with him and we can recommend him to any team at any time.",
      author: {
        name: "Max Kuck",
        role: "Product Designer",
        link: "https://www.upwork.com/freelancers/~013da23dfa6724ea97",
      },
    },
  ],
  [
    {
      content:
        "Edwards was a valuable member of the team as a lead engineering developer. His hard work, dedication and skillfulness contributed greatly to serving our customers and users well.",
      author: {
        name: "Segun Aderinto",
        role: "Co-founder at Learnflo",
        link: "https://www.linkedin.com/in/segun-aderinto-mcpn-a4b1b767/",
      },
    },
    {
      content:
        "I first met Edwards when I joined a startup as a Product Designer to design their learning web app and he was the developer on the team. Working with Edwards was a real pleasure. His communication was always pleasant and clear, which helped him build strong relationships within the the team and with our customers.",
      author: {
        name: "Jerry Ibeawuchi",
        role: "Senior Product Designer at AKQA",
        link: "https://www.linkedin.com/in/jerry-ibeawuchi/",
      },
    },
  ],
];

export const Testimonials = () => {
  return (
    <>
      <section className="relative py-32 mt-8 overflow-hidden bg-testimonial-brand">
        <div className="relative mx-auto">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-3xl tracking-tight text-white font-display sm:text-4xl">
              Don't take <i>my word</i> for it
            </h2>
            <p className="mt-4 text-lg tracking-tight text-white">
              I've had the immense pleasure to work with great people and companies. Here's are few words they had to
              say about working with me.
            </p>
          </div>
          <ul className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-16 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul className="space-y-7 sm:space-y-8">
                  {column.map((testimonial, testimonialIndex) => (
                    <li key={testimonialIndex}>
                      <figure className="relative p-6 bg-white shadow-xl rounded-2xl bg-testimonial-card shadow-slate-900/10 fade-in">
                        <img src="/assets/quote.png" className="absolute right-0 bottom-1 quote opacity-20" />
                        <blockquote className="relative">
                          <p className="text-lg tracking-tight" style={{ color: "#000" }}>
                            {testimonial.content}
                          </p>
                        </blockquote>
                        <figcaption className="relative flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                          <a href={testimonial.author.link || "#"} target="_blank" className="hover:no-underline">
                            <div className="text-base font-display">{testimonial.author.name}</div>
                            <div className="mt-1 text-sm">{testimonial.author.role}</div>
                          </a>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div>
            <div className="flex justify-center mb-5 mt-14">
              <div className="mx-auto flex flex-col space-y-2 px-3 md:px-0">

                <OutboundLink href="https://calendly.com/edwardsmoses/30min"
                  target="blank"
                  className="flex items-center justify-center px-8 py-3 text-xl font-medium bg-white border border-transparent rounded-md md:py-4 md:text-lg md:px-10 min-w-min hover:no-underline hover:opacity-80">
                  Book a call with me today {"->"}
                </OutboundLink>

                <OutboundLink
                  href="https://portfolio.edwardsmoses.com/#projects"
                  target="blank"
                  className="flex items-start justify-start md:items-center md:justify-center text-base md:text-xl min-w-min hover:no-underline hover:opacity-80 mx-2 md:mx-10 text-app-brand-white tracking-tightest border-b border-white">
                  or check out the projects I've been a part of
                </OutboundLink>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
