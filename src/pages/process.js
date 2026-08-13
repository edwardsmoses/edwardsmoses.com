import React from "react";
import Layout from "../components/layout";
import { SEO } from "../components/seo";

const ProcessPage = () => {
  return (
    <Layout>
      <SEO
        title="How we work — React & React Native consulting"
        description="How Edwards Moses works with clients: a one-week working session, weekly sprints, daily updates, store launch, and post-launch retainers."
        pathname="/process/"
        pageType="WebPage"
      />
      <div className="relative px-0 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 text-balance dark:text-zinc-100 sm:text-5xl">
            How we work
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
            I build and improve React and React Native apps, including the parts
            that usually stall a launch: payments, auth, store listings, and the
            features that show up once real users arrive.
          </p>
          <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
            If that sounds like what you need, here’s the path.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 font-display">
              Start here: a one-week working session
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              Before a long engagement, we do one paid week together.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              You get:
            </p>
            <ul className="mt-3 space-y-2 text-base leading-7 list-disc list-inside text-zinc-600 dark:!text-zinc-100">
              <li>
                A working slice of the product (or a clear audit of the existing
                app)
              </li>
              <li>A written plan: what’s in, what’s out, timeline, and budget</li>
              <li>
                A decision: we continue, we reshape the scope, or we stop
              </li>
            </ul>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              This is the whole point of the week. You see how I work. I see the
              real codebase and the real constraints. Nobody is guessing.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              Book a 30-minute call and we’ll see if the week is a fit.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 font-display">
              If we continue
            </h2>
            <div className="mt-6 space-y-6 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              <p>
                <strong className="text-zinc-800 dark:text-zinc-100">
                  Week to week.
                </strong>{" "}
                We work in weekly sprints. Monday: I tell you what will be done
                by Friday. Friday: I demo it. You get an in-progress build every
                week, not a big reveal at the end.
              </p>
              <p>
                <strong className="text-zinc-800 dark:text-zinc-100">
                  During the week.
                </strong>{" "}
                Daily updates on Slack. Trello for the task list, GitHub for the
                code. You always know what’s moving.
              </p>
              <p>
                <strong className="text-zinc-800 dark:text-zinc-100">
                  When it’s ready for people.
                </strong>{" "}
                Mobile: Firebase App Distribution for beta testers. Web: a
                private URL. We fix what beta users actually hit.
              </p>
              <p>
                <strong className="text-zinc-800 dark:text-zinc-100">Launch.</strong>{" "}
                I help you through Play Store and App Store with a checklist of
                what they will ask for, then we publish.
              </p>
              <p>
                <strong className="text-zinc-800 dark:text-zinc-100">
                  After launch.
                </strong>{" "}
                Most of the useful work starts here. Users show up, new features
                appear, something only breaks in production. I stay on for that.
                Retainers are normal.
              </p>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 font-display">
              What I need from you
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              A person who can answer product questions in the same week I ask
              them. Access to the repo, the stores, and the existing services
              (Firebase, Stripe, and so on). Honesty about budget and deadline.
            </p>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              I write things down. Proposals include requirements, timeline, and
              budget. You’ll get documentation at each milestone, not just code.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 font-display">
              Who this is for
            </h2>
            <ul className="mt-4 space-y-2 text-base leading-7 list-disc list-inside text-zinc-600 dark:!text-zinc-100">
              <li>
                A founder who needs the app actually shipped, not another
                prototype
              </li>
              <li>
                A team with an app in the wild that needs the next set of
                features
              </li>
              <li>
                An agency that needs a React / React Native pair of hands so a
                deadline still holds
              </li>
            </ul>
            <p className="mt-4 text-base leading-7 text-zinc-600 dark:!text-zinc-100">
              If you’re not sure which of those you are, the call is still the
              right first step.
            </p>
          </section>

          <div className="hero-actions mt-12 mb-16">
            <p className="w-full mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              Currently taking 1–2 new builds.
            </p>
            <div>
              <a
                href="https://calendly.com/edwardsmoses/30min"
                target="_blank"
                rel="noreferrer"
                className="action-link action-link--primary"
              >
                Book a call
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
      </div>
    </Layout>
  );
};

export default ProcessPage;
