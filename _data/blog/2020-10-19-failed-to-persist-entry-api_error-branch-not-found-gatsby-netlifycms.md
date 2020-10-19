---
template: BlogPost
path: /failed-to-persist-entry
date: 2020-10-19T01:13:06.143Z
title: 'Failed to persist entry: API_ERROR: Branch not found - Gatsby & NetlifyCMS'
metaDescription: >-
  Failed to persist entry: API_ERROR: Branch not found - Gatsby Delog Starter -
  NetlifyCMS
thumbnail: >-
  /assets/68747470733a2f2f77336c61796f7574732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032302f30332f64656c6f672e6a7067.jpg
---
While creating your Gatsby Blog, if you chose the Gatsby Starter[ **Delog - Blog for Developer and Designer**](https://delog-w3layouts.netlify.app/) developed by **W3Layouts,** chances are that while you create a new entry to **Publish** on Neltify CMS, you would get the error:

`Failed to persist entry: API_ERROR: Not Found`

So to fix the error, in the **static/admin** directory, at the top of your config.yml, add the following:

```
backend:
  name: github
  repo: <your-repo-name>
  accept_roles:
    - admin
    - editor
  branch: main 
  
  --- rest of config.yml file --- 
```

Commit the changes, and then re-deloy to Netlify. \
The error should be gone, and you should be able to publish a new entry now.
