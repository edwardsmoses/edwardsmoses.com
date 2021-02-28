---
template: BlogPost
path: /detecting-the-active-folder-using-nextjs-using-useRouter
date: 2021-02-28T21:24:32.212Z
title: Detecting the Active Folder in NextJS using useRouter
metaDescription: >-
  How to determine the active folder of the Current URL using useRouter in
  NextJS
thumbnail: /assets/cover-1--2-.png
---
Recently, while working on an application, I came across having to determine the folder of the current URL and assign a class to the 'Active Link' in the Navbar to be styled differently from other links.

## How did I achieve this?

 In my Navbar component, I checked if the current pathname (URL) segment matches the Link's route, and if it matches, I add the Active class (`activeClassName`) to the Link.

```
import Link from 'next/link'
import { useRouter } from 'next/router'
....

const Navbar = () => {

  const router = useRouter();

  const appRoutes = [{route: "/dashboard", name: "Dashboard"}, {route: "/users", name: "Users" }]

return (

  <div>
    {appRoutes.map(link => (
      <Link key={link.route} href={link.route}>
          <span
            className={`linkClassName ${
              `/${router.pathname.split('/')[1]}` === link.route ? 'activeClassName' : '' }`}>
           {link.name}
          </span>
      </Link>
     ))}
   </div>

)}
```

## What is happening above:

\
The `appRoutes` is an array of the Routes Object`({route: "", name: ""} )` for the Application. 

In line 15, I checked if the first segment of the current URL matches the Link's directory. When it matches, it adds the '`activeClassName`' to the Link component. 

#### Where was this technique useful:

* For Detail, Edit, and New pages inside of Folders.



**Inspired by:**\
https://gist.github.com/remy/0dde38897d6d660f0b63867c2344fb59#gistcomment-2393414
