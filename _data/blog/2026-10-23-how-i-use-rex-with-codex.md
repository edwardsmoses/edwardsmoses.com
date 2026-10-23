---
template: BlogPost
path: /how-i-use-rex-with-codex
date: 2026-10-23T10:00:00.000Z
title: How I Use Rex with Codex
metaDescription: "How Rex clicked for me: using Codex to start a local app stack, test separate worktrees, and keep servers, logs, and follow-up work together."
---

On 19 October, I got an invite to try [Rex](https://www.superlogical.com/updates/public-testing-beginning), the terminal multiplexer from [Superlogical](https://www.superlogical.com/). At first, I wasn't particularly excited. I didn't quite grok where it would fit into how I worked.

I joined their Discord and looked around for examples of how people were using it. I couldn't find a channel dedicated to use cases when I first joined, though there is one now. Without something concrete to try, I left it alone.

A few hours later, I was working on a project that needed several things running locally: the web frontend, an API server, background jobs, and the Expo development server. Then the app in the iOS Simulator needed to connect to the local API, with the background jobs using the right local services too.

Usually, that means opening terminals, moving into the right directories, starting each process, checking ports, and remembering which environment variables need changing. It is a familiar routine, but there are quite a few small things to get right before I can actually test anything.

And then it occurred to me: this was something I could try with Rex.

So I gave Codex a request:

> Let's use Rex to spin up all of this, the web, server and mobile.

From that one request, Codex put together a Rex session with tabs for the different services, started them from the relevant checkouts, and connected the web and mobile apps to the local API. It opened the mobile app in the simulator through its development client too.

It even started a separate Redis instance, on its own port, and configured the development queues to use it. The Redis installation was already on my machine; Codex handled starting and wiring up the instance for this project.

That was the part that surprised me. I had asked for the application to be brought up, and it had worked through the supporting setup as well.

Okay, now I had a use case.

## Trying another worktree

The next thing that clicked was how useful this could be when testing different worktrees of the same project.

I might have one version running while reviewing a PR, then want to try another branch without dismantling the first setup. Each checkout needs its own processes, and those processes need to avoid fighting over ports or accidentally sharing the wrong queues.

With Rex, I can ask Codex to create another session for that worktree and do the setup there. One session holds one version of the application, another holds the version I want to compare it with. I can move between them and see what each is running.

The request becomes something like:

> Bring up this PR in a separate Rex session. Use separate ports, point the mobile app at its local API, and give its background workers their own Redis setup. Keep the existing session running.

There is still configuration involved. Git worktrees give me separate checkouts; the ports and running services need to be configured separately. Codex can handle that work through Rex and leave the result somewhere I can inspect.

For a project using Docker, container names, published ports, and any volumes that need to stay separate also need attention. A new Rex session doesn't automatically isolate them. In the setup above, Redis was a normal local `redis-server` process on a dedicated port.

That makes the useful part easier to describe: I can hand off much of the setup and keep each running version organised, instead of carrying all of those details around in my head.

I also tried this for a horizontal-video PR. I asked for a separate Rex session, and we brought up that PR's frontend while leaving the other workspace available. The worker and sign-in setup were still separate steps, but the review already had somewhere to live.

## Is this actually the latest checkout?

Once I started using it this way, I kept asking another question:

> Is Rex running the checkout where these updates are?

During one review, the answer was only partly yes. The web app was current, but the API and mobile development server were still running from earlier revisions. The commits had been pushed; the running processes needed refreshing.

Now, when I ask Codex to update the session, I want it to check the directory and revision behind each service, restart what needs restarting, and confirm that it is ready. An Overview tab with the local URLs and restart instructions has been useful here too.

There was another small rabbit hole after that. The latest mobile code was running, but onboarding still showed an older flow. I initially wondered whether the checkout was wrong again.

It turned out that the simulator had an experiment assignment saved in the app's local storage. Restarting the development server wasn't going to change that. We checked the saved state, reset the relevant assignment, and later reinstalled the app when I wanted a fresh onboarding test.

So there are two things to keep track of: the code the process is serving, and the state the application has already saved. Having the terminals together made the first one easier to check, which helped us get to the second.

## After deploying, keep an eye on it

Continuing to use the combination, I realised I could take it a little further. Once an update was deployed, I could ask Codex to keep an eye on the logs through Rex while I tested it.

For an account-linking release, my request was to watch for account-linking failures, email errors, and HTTP failures while the mobile testing happened. Another check focused on Stripe webhook delivery and fulfillment on the web side.

The Heroku watch started with the platform's normal [log-streaming command](https://devcenter.heroku.com/articles/logging#real-time-tail), wrapped in a small script running in a named Rex tab. That script collected the relevant events, saved sanitised operational details, checked the application's health endpoint, and reconnected if the stream dropped.

In that particular setup, the health check ran every minute. I also had a scheduled Codex review every five minutes to look at the new events, check whether the stream was still receiving logs, and flag meaningful problems. The watch had a two-hour limit.

That detail helped me understand what I was asking for. The collector kept running between reviews. Codex came back to inspect what it had collected. I could open the same Rex tab myself whenever I wanted to see what was happening.

A request for another release might look like this:

> Check which release is live, then keep its logs running in a named Rex tab while I test. Watch for the errors relevant to this change, check health periodically, and review new events every five minutes for the next two hours. Let me know about new problems or gaps in the watch, and stop it when we're done.

I like being able to deploy something and continue the conversation with “what happened when I tried that?” The release, log output, and checks are there to work from, rather than having to collect them all after a failure.

I've used Rex tabs for checking Node versions on Heroku and following application rebuilds too. A quiet monitoring window still only tells me about the period and flows we observed, so I want that time range included in the result.

And once we are done, I ask Codex to close the session. Otherwise, I would eventually end up with a very organised collection of terminals doing things I no longer remember starting :-)

## Continuing from a terminal that is already open

Another useful moment came while working on direct photo and video uploads to Cloudflare R2.

I already had a staging database proxy running in Rex. I asked Codex to use that session to apply the migration, and it opened another pane while keeping the proxy available. Afterward, we used the same workspace for the staging deployment and upload checks, then stopped the proxy when it was no longer needed.

I then wanted to see an actual example: create a staging incident and upload some photos and videos to it.

We did that through the API, checked the files in R2, downloaded them to compare the bytes, and checked duplicate handling. One video was verified by the background worker without the app calling the completion endpoint. We left a labelled example available for me to inspect.

That tested the staging backend and storage path. The native mobile upload behavior still needed its own testing, particularly around interruptions and recovery.

What I liked was being able to continue from the connection I already had open, then follow the task through to an example I could look at.

## The parts I still need to do myself

I also asked Codex to connect a Rex terminal to an exe.dev machine over SSH. In that setup, the SSH client runs in a local Rex tab, and I can move between the remote shell and my local terminals.

When creating the SSH key needed a passphrase, Codex left the terminal at that step and I entered it directly in Rex. The same thing happened during a Homebrew update when an installer needed my administrator password, and during an npm release when sign-in needed my involvement.

That interaction feels quite natural. Codex gets the task to the point where I need to do something, I do it in the terminal or browser, and then it can continue checking the result.

For the Homebrew update, having a named upgrade tab was also handy. It took a while, and I could return to it to see how things were progressing.

## Following an investigation a little further

The longest example so far has been some work on [Rill](https://userill.dev).

I wanted to compare different ways of trimming the context sent to the model during browser tasks. I asked Codex to use Rex for the benchmark and compare cost per correctly verified run, latency, and any evidence lost along the way.

We ran 48 trials across six synthetic cases and four variants. The logs and recordings were saved, and the comparison was opened in a `Benchmark-results` tab.

There were useful surprises. Some filtering removed facts that the model needed to verify the task. In another run, the browser reached the final page and reported the right result, but the recording stopped on the preceding page. That led to a separate recorder investigation.

It was a small diagnostic experiment, but it showed me another use for this setup. I could come back with a question about a result, and the command output and artifacts were still there to work from.

## Getting Codex set up

Rex has an [agent skill](https://www.superlogical.com/rex/docs/automate/agent-skill) that teaches Codex how to work with its sessions, tabs, and panes. The setup command is:

```sh
rex skill setup
```

The skill reads its command guide from the installed version of Rex, which helps while things are changing during the beta.

One small thing I ran into: Codex was running outside Rex, and `rex` wasn't on its `PATH`. We used the CLI bundled with Rex Beta. The [CLI documentation](https://www.superlogical.com/rex/docs/automate/cli#path) covers the PATH setup if you hit that too.

## One thing I'm still figuring out

There is one thing I am still getting used to, and I'm not quite sure I would call it a con: the boundary between what Rex is doing and what Codex is doing can feel blurry.

I ask for a local environment, and services appear in the right tabs. I ask for a release watch, and there is a terminal collecting logs and a later update about what it found. In use, it feels like one thing.

The distinction I have so far is that Rex keeps the terminal sessions and processes available and gives software a way to control and inspect them. Codex works out which commands to run, prepares the configuration or scripts, and interprets the results. The deployment tools and log commands do their usual jobs inside that setup.

For the monitoring example, the collector script runs in Rex, and the scheduled Codex reviews are another part of the workflow. Rex's [agent documentation](https://www.superlogical.com/rex/docs/automate/agent-skill) helps explain how the agent controls the terminal.

I can describe that distinction, but I am still building an instinct for it when I use the two together. I expect more usage will give me a clearer picture of where one stops and the other takes over.

For now, a surprising number of my requests end with “can we use Rex for this?” Getting several local services running was enough to make it click. Being able to leave that work open and follow it through testing, deployment, and the next question has kept me using it.
