import React from "react";
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
        "Having worked with Edwards with more than a year, I recommend Edwards. His skills in building applications and his support on the rest of the team is tremendous",
      author: {
        name: "Sardorek Aminjonov",
        role: "Engineer, TroutHouseTech",
        link: "https://www.linkedin.com/in/sardorek-aminjonov-059a981b1/",
      },
    },
  ],
  [
    {
      content:
        "Anytime a new development challenge arose, Edwards was the one to tackle it. Annotations, custom CRMs, Admin Panels, emails, CI/CD, PDF generation, etc. He did it all when I couldn't. Your team would be lucky to have Edwards and I urge you to reach out.",
      author: {
        name: "Matt Ruiz",
        role: "Founder of TrouthouseTech",
        link: "https://twitter.com/MatthewZRuiz/status/1549772556835733504",
      },
    },
    {
      content:
        "I worked with Edwards for more than 4 years , on so many projects ranging from educational web apps, supply chain apps to networking. he has delivered a very commendable job. specifically he pays detailed attention to software design and project direction",
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
        "Edwards can be a valuable member of the team as a engineering lead developer. His hard work, dedication and skillfulness contribute greatly to serving our customers and users well.",
      author: {
        name: "Segun Aderinto",
        role: "Co-founder at Learnflo",
        link: "https://www.linkedin.com/in/segun-aderinto-mcpn-a4b1b767/",
      },
    },
    {
      content:
        "I first met Edwards when I joined a startup as a Product Designer to design their learning web app and he was the full-stack developer. Working with Edwards was a real pleasure. His communication is always pleasant and clear, which helped him built many strong relationships within the the team and with our customers",
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
      <section className="relative overflow-hidden bg-testimonial-brand py-32 mt-8">
        <div className="mx-auto relative">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
              Don't take <i>my word</i> for it
            </h2>
            <p className="mt-4 text-lg tracking-tight text-white">
              I've had the immense pleasure to work with great people and companies. Here's are few words they had to
              say about working with me.
            </p>
          </div>
          <ul className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((column, columnIndex) => (
              <li key={columnIndex}>
                <ul className="space-y-7 sm:space-y-8">
                  {column.map((testimonial, testimonialIndex) => (
                    <li key={testimonialIndex}>
                      <figure className="relative rounded-2xl bg-white bg-testimonial-card p-6 shadow-xl shadow-slate-900/10 fade-in">
                        <img src="/assets/quote.png" className="absolute bottom-1 right-0 quote opacity-20" />
                        <blockquote className="relative">
                          <p className="text-lg tracking-tight" style={{color: "#000"}}>{testimonial.content}</p>
                        </blockquote>
                        <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                          <a href={testimonial.author.link || "#"} target="_blank" className="hover:no-underline">
                            <div className="font-display text-base">{testimonial.author.name}</div>
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
        </div>
      </section>
    </>
  );
};
