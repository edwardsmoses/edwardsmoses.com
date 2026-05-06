---
template: BlogPost
path: /personal-git-alias-faster-git-workflow
date: 2022-04-24T01:32:32.755Z
title: My Personal Git Alias(es) I use for faster Git workflow
metaDescription: Personal list of Git Aliases I use day-to-day in my Git workflow
thumbnail: https://miro.medium.com/max/1400/1*oMC83-7fB27k1tTMxDfRaQ.png
---
### Setting Git Alias - How?

Git aliases are stored in the user's configuration in the `~/.gitconfig` file (for Windows, `C:\Users\<user-name>\.gitconfig`). To add the alias, open the file and add/edit the `[alias]`  section. 

### Here is the list of all aliases I use day-to-day: 
```
[alias]
    s = status
    co = checkout
    cob = checkout -b
    del = branch -D    
    br = branch --format='%(HEAD) %(color:yellow)%(refname:short)%(color:reset) - %(contents:subject) %(color:green)(%(committerdate:relative)) [%(authorname)]' --sort=-committerdate
    save = !git add -A && git commit -m 'chore: savepoint'
    undo = reset HEAD~1 --mixed
    res = !git reset --hard
    done = !git push origin HEAD
    lg = !git log --pretty=format:\"%C(magenta)%h%Creset -%C(red)%d%Creset %s %C(dim green)(%cr) [%an]\" --abbrev-commit -30
	gbr = !git branch | grep -v master | xargs git branch -D
	ll = log --pretty=format:"%C(yellow)%h%Cred%d\\ %Creset%s%Cblue\\ [%cn]" --decorate --numstat
    cm = !git add -A && git commit -m 
    ph = push
    pl = pull
    maincopy = !git fetch origin && git reset --hard origin/main
    maincopyp = !git fetch origin && git reset --hard origin/main && git push --force-with-lease origin HEAD
```

#### Updates: Fri May 1, 2026

Was typing `git push`, and made a mistake and used `git ph`, and it occurred to me, won't that be a nice alias for git push, instead of typing everything, just git ph; so there goes. 

### Updates: Fri May 6, 2026

New aliases I added, when I need to match main on my current branch, and forego all current changes. 