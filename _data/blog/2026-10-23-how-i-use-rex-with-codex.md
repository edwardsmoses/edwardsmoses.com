---
template: BlogPost
path: /how-i-use-rex-with-codex
date: 2026-10-23T10:00:00.000Z
title: How I Use Rex with Codex
metaDescription: How I use Rex with Codex to run web, server, and mobile checkouts, inspect staging uploads, monitor releases, and keep long-running work visible.
---

One question keeps coming up in my Codex chats:

> Is Rex running the checkout where these updates are?

It sounds like a small question. But when a feature spans a web app, an API, and a mobile app, having the code ready is only part of getting it ready to test. The right processes need to be running from the right directories, talking to each other, with somewhere sensible to look when something fails.

[Rex](https://www.superlogical.com/rex/docs/installation) has become where I keep that work visible. I ask Codex to start services, refresh a checkout, run a staging test, or investigate a failure. Codex uses Rex's CLI, and I can open the same sessions to see what is happening or take over an interactive step.

Looking back through those chats, a few patterns stand out.

## Getting the whole project running together

One of my requests was straightforward:

> Let's use Rex to spin up all of this, the web, server and mobile.

That became a named session containing the web frontend, API, React Native bundler, and a local Redis instance. An Overview tab held the local URLs, checkout locations, and restart instructions. Later testing also needed Stripe forwarding.

The arrangement looked roughly like this:

```text
Account-linking workspace
├── Overview
├── Web
├── Server
├── Mobile
├── Redis
└── Stripe
```

The useful part was being able to come back to that session and find each part of the application. I could open the frontend, reload the mobile app from its terminal, or inspect the server output while testing the same flow.

There was still setup work behind it: pointing the frontend and mobile app at the local API, choosing ports, and making sure local workers used the intended queues. A session name doesn't configure those connections. It gives me a place to keep them together once they are configured.

I also use separate sessions for separate investigations. When reviewing a horizontal-video change, I asked for a different Rex session for that PR. That let us bring up its frontend without replacing the workspace I was already using.

One wrinkle I ran into: creating a session and displaying it in the Mac app are separate steps. With Rex's Remote Control setting off, Codex could start the services but couldn't switch the visible app to their session. I selected it manually and continued testing.

## Checking what is actually running

The checkout question became a recurring part of the workflow for a reason.

During one review, checking the running processes showed that the web app was current, while the API and mobile bundler were still using earlier revisions. The updates had been pushed, but those terminals hadn't followed them.

Now, when I ask Codex to refresh Rex, the useful result includes the checkout, revision, and listening port for each service. Then we restart the relevant processes and check that the endpoints respond or the mobile bundle compiles.

That also helps separate a stale process from another kind of stale state.

In one simulator test, the latest mobile checkout was running, but onboarding still showed the older flow. The cause turned out to be an experiment assignment saved on the device. Restarting the bundler couldn't clear it. We checked the persisted state, reset the relevant assignment, and later did a clean reinstall when I wanted a fresh onboarding test.

That was a useful reminder: “the terminal is on the latest code” answers one question. There can still be browser storage, simulator data, or a previously downloaded update affecting what I see.

## Leaving commands and results somewhere I can inspect

I increasingly ask for work to happen in a named Rex tab: a build, a test run, a deployment check, or a results summary.

Rex calls a tab a **window** and a terminal pane a **block**. Its [CLI documentation](https://www.superlogical.com/rex/docs/automate/cli) explains the naming and how to target each one.

A shortened version of the pattern looks like this:

```sh
# rex_session is the full session ID returned by Rex.
# project_dir is the absolute path to the checkout being tested.
started=$(rex window new -s "$rex_session" Tests -c "$project_dir" \
  --keep-open --focus=false --json -- npm test)

test_block=$(printf '%s' "$started" | jq -er '.block_ids[0]')

rex capture -s "$rex_session" -b "$test_block" --trim --unwrap
rex block call -s "$rex_session" -b "$test_block" process
```

The project supplies the actual test command; this example uses `npm test` and `jq` to extract the returned pane ID.

`--keep-open` leaves the result available after the command exits. `--focus=false` lets the work start without pulling me away from the tab I'm reading.

Codex can read the pane with `capture` and inspect its process state. I can read it myself too. For longer jobs, we also save output to log files, because a terminal's current screen doesn't contain its entire history.

That last distinction matters. A tab remaining open doesn't mean its command is still running, and a few promising lines don't establish that a test completed successfully. We check the process result and the relevant artifacts before calling it done.

## Using the staging connection that is already open

Another recurring request is to continue from an existing Rex session.

While working on direct photo and video uploads to Cloudflare R2, I already had a staging database proxy running in Rex. I asked Codex to use that session to apply the migration.

It opened a second pane for the migration while keeping the proxy alive. We checked the schema, applied the migration, and then used the workspace for the staging deployment and upload checks. Once the database connection was no longer needed, we stopped the proxy.

I then asked for an actual example: create a staging incident and upload some photos and videos.

That gave me something concrete to inspect. The checks exercised upload reservation, direct upload to R2, verification, and reading the uploaded bytes back. They also checked duplicate handling and a video being verified by the worker without an app completion call. We left a labelled example available for review.

Those checks established the staging backend and storage behavior. Testing native mobile uploads through interruption and recovery was still separate work.

Rex was useful throughout because the connection, migration, deployment output, and test results were accessible in the same workspace.

## Keeping logs open while I test

After a deployment, my next request is often some version of:

> Keep the server monitoring running in Rex while we test.

For an account-linking release, that meant watching for account-link failures, email errors, and HTTP failures while the mobile testing happened. A separate web check focused on Stripe webhook delivery and fulfillment errors.

The useful output includes which release is running, which errors the watch is looking for, and how long the observation lasts. A short clean sample gives me evidence about that window; it doesn't establish that every production flow works.

For runtime maintenance, I've also used Rex tabs to check the actual Node versions on Heroku, follow rebuilds from deployed commits, and inspect the checks afterward. The terminal output helps connect the intended update to what the running application actually reports.

This also gives the work a clear end. Once a monitoring task was finished, I asked Codex to close its Rex session. I want the tabs that remain open to have a reason to be there.

## Remote maintenance, with room for me to step in

My remote workflow started with another small request: connect Rex to an exe.dev machine over SSH.

In that setup, a local Rex tab runs `ssh`. I can keep the VM shell beside the local terminals and return to either as the task moves between machines.

The connection also showed a practical advantage of sharing the terminal with Codex. When SSH key creation needed a passphrase, I entered it directly in Rex. The same pattern came up during Homebrew maintenance when an installer needed my administrator password, and during an npm release when authentication needed my involvement.

Codex could prepare the command, leave it at the interactive step, and continue checking the result after I finished. I didn't have to move the whole task into a separate terminal or paste credentials into chat.

For the broader Homebrew update, the named upgrade tab also gave me somewhere to inspect progress while the maintenance took longer than a normal command.

## Running an investigation that outlasts a single prompt

The most involved example so far has been a context-handling investigation for [Rill](https://userill.dev).

I asked Codex to benchmark structural filtering and bounded history against the existing trimming behavior, using Rex. The comparison needed to look at cost per correctly verified run, latency, and any evidence lost along the way.

We ran 48 trials across six synthetic cases and four variants, with two repetitions. The work stayed available through a benchmark session, saved logs, recordings, and a `Benchmark-results` tab.

It was a small diagnostic experiment. The interesting outcome was that reducing context could remove facts needed to verify the task. In another run, the browser reached the final page and reported the right result, but the saved video ended on the preceding page. We kept that run outside the fully verified count and investigated the recorder separately.

That is the kind of task where I appreciate having the work in Rex. I can ask a follow-up about a result, and there is still a session, a command, and a set of artifacts to inspect. The conversation can continue from the evidence already collected.

## A small setup detail

Rex provides an [agent skill](https://www.superlogical.com/rex/docs/automate/agent-skill) for Codex and other coding agents. Its documented setup command is:

```sh
rex skill setup
```

The skill gets its command guide from the installed Rex version. That is helpful while the CLI evolves. When Codex is running outside a Rex terminal, it can discover sessions with `rex whoami --json` and `rex ls --json`, then target the chosen session explicitly.

Outside Rex, I've also had to use the CLI bundled with Rex Beta because `rex` wasn't on Codex's `PATH`. Rex's [PATH documentation](https://www.superlogical.com/rex/docs/automate/cli#path) is useful if you hit the same problem.

I still spend most of my attention on the application I'm testing and the conversation about what to change. Rex gives the commands behind that work a place I can return to: the server that's running, the build that failed, the staging example ready to inspect, or the log stream waiting while I try the next step.
