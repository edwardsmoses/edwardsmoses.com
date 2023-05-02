---
template: BlogPost
path: /migrating-to-dnd-kit-from-react-sortable-hoc
date: 2023-04-27T03:03:46.203Z
title: Migrating to React DND Kit from React Sortable Hoc [In Progress]
thumbnail: /assets/edwardsmoses_react_dnd_kit.png
---

<!--StartFragment-->

## **Introduction**

I recently worked on a feature request to build a drag-and-drop sorting interface for a project I'm a part of. When we started on the feature, across many libraries that offered this functionality for React, we settled on two: React Sortable Hoc and React DND Kit. (spoiler: we eventually settled on DND Kit)

After comparing the API for both libraries, we went with React Sortable HOC, as the API for the library was relatively simpler, and so it was easier to implement the drag and drop interface we wanted.

But a new feature for the drag-and-drop interface was requested by the project stakeholder; we had to add a new feature, allowing users to drag across different sortable lists.

Previously, the interface only allowed for dragging and dropping across one list, but we now needed to allow users to drag and drop across different lists, and unfortunately, React Sortable HOC didn't have that feature set.

So, we looked into React DND Kit, and voila, it allowed for both sorting across one list, and dragging/dropping across to a different list, albeit with a relatively complex API. And so, we set out to migrate from React Sortable HOC to React DND kit, with some little hiccups.

So, in this article, we'll together be migrating a project that initially used to React Sortable HOC to the new React DND Kit.

## Getting started

To get started, as we're used to via `npm` / `yarn`, install the core library and the sortable preset:

```bash
npm install @dnd-kit/core @dnd-kit/sortable


``
```
