---
template: BlogPost
path: /auto-incrementing-version-code-for-android
date: 2022-05-22T00:51:52.613Z
title: Automatically Incrementing Android Bundle Version Code
metaDescription: How to automatically increase version code for Android Bundles
thumbnail: /assets/w7rq7.png
---
When uploading Android bundles (.aab) file to the Playstore, it's important that the Version code be higher than a previously uploaded bundle.

If it isn't, you get the error "Version code has already been used. Try another version code". Pretty frustrating when that happens, as you have to restart the build to upload. 



Here's an approach to automatically increasing the Version code, so we don't have to worry about manually increasing the version code before building the Android bundle. 

We'll be using this awesome service: [increment.build](https://github.com/JonnyBurger/increment.build). \
What the service does is pretty simple - it returns an incremented number on demand. 

\
So, to get started, the first step would be to:\
- Set up the service to our current version code number. Say the current version code of the app is 22. We do that by running the following command in the terminal (where \`edwardsmoses-app\` is a unique name you'll want to use for your app):

```
 curl https://increment.build/edwardsmoses-app/set/22
```

\
\
When that's done, we want to update our \`build.gradle\` file in the \`android/app\` directory to auto-increment the version code. \
\
To do, we'll add the below code snippet to the gradle file: 

```
def getIncrementedVersionCode () {
    def link = 'https://increment.build/edwardsmoses-app'

    def request =  ['curl', '-X', 'GET', link].execute()
    request.waitFor()

    def response = request.text
    println("Incremented Version Code")
    println(response)

    return response.toInteger()
}
```

What the above does is pretty simple, it runs a curl request, waits for the response (a new incremented number), and then converts that number to an integer (without converting to an integer, we'll get a build error).\
\
Then, the **final** step would be to replace the \`versionCode\` line with the below:

```
versionCode getIncrementedVersionCode()
```

\
And **boom** 😎, every-time the Android bundle is built, we get a \`.aab\` file with a new version code, and we don't have to manually increase the version code. \
\
As always, I'll love to know how this can be improved, or alternative ways this can be done. \
Looking forward to comments and suggestions.