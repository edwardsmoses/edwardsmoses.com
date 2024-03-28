---
template: BlogPost
path: /automated-backups-cloud-firestore
date: 2022-12-24T17:24:36.203Z
title: How to Set Up Automated Backups for Cloud Firestore Database
metaDescription: Learn how to set up automated backups for your Cloud Firestore
  database using Google Cloud's native tools. This step-by-step guide will show
  you how to schedule regular backups and protect your data from system failure
  or disaster.
thumbnail: /assets/edwards-moses-pexels-pixabay-270348.jpg
---

<!--StartFragment-->

Automated backups are an essential part of any data management strategy, as they ensure that important information is not lost in the event of a disaster or system failure.

In this article, we will discuss how to set up automated backups for a Firestore database, and at the end, you'll have scheduled automated daily Firestore backups and will use different storages classes to reduce your backups storage cost.

Firestore is a NoSQL document database that is built for fast and flexible querying, and it is a popular choice for web and mobile applications. It is fully managed by Google Cloud, which means that it handles the infrastructure and scaling for you, so you can focus on building your application.

## Updates

Here's a updated guide on setting up automatic backups for your Cloud Firestore project:
<https://edwardsmoses.com/updated-guide-on-setting-up-automated-backups-cloud-firestore>

## Getting Started

We use Firebase Cloud Functions to initiate the backups, so billing should be enabled on your Firebase Project.

### First, create the Storage bucket for the backups

We'll want to create a storage bucket for your Firebase Project. To do so, on your Firebase Project, on the the Storage section, click on '**Add a bucket**', then proceed to creating your bucket, by specificizing the **Name of the bucket**, the **region**, and the **access frequency** (Infrequent is a recommended option for backups).

!["Creating a Storage bucket"](/assets/edwards-moses-storage-bucket.jpg)

After creating the Storage bucket, the next step would be to setup the cloud function that would initiate the automated backups.

## Create Cloud Function

We want to create a cloud function named `dailyFirestoreBackup` that'll be run every midnight.

```javascript
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const client = new admin.firestore.v1.FirestoreAdminClient();

export const dailyFirestoreBackup = functions.pubsub
  .schedule("0 0 * * *") // Every 24 hours (at midnight).
  .onRun(async () => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;

    const bucketName = ""; //the name of your storage bucket

    const databaseName = client.databasePath(projectId, "(default)");
    const timestamp = new Date().toISOString();

    const dest = `gs://${bucketName}/firestore/${timestamp}`;

    try {
      const responses = await client.exportDocuments({
        name: databaseName,
        outputUriPrefix: dest,
        // Leave collectionIds empty to export all collections
        // or set to a list of collection IDs to export,
        // collectionIds: ['users', 'posts']
        collectionIds: [], // Leave empty to export all collections.
      });
      const response = responses[0];
      console.log(`Operation Name: ${response["name"]}`);
    } catch (error) {
      console.error(error);
      throw new Error("Export operation failed.");
    }
  });
```

Where:

- `timestamp` is the name of the backup.
- `databaseName` is the name of the database we want to back up.
- `bucketName` is the name of the Cloud Storage bucket where the backup will be stored.

And, finally, we want to deploy our cloud function, and we use the following command:

```bash
firebase deploy --only functions:dailyFirestoreBackup

```

To run the above command, it's important that we'll have the Firebase CLI [configured](https://firebase.google.com/docs/cli) on our machine.

## Conclusion

Automated backups are a crucial part of any data management strategy, and they can help you protect your important information in the event of a disaster or system failure.

By following the steps outlined above, we'll have an automated backup system for our Firestore Database.

Here are some resources/documentation that could be helpful:

<https://firebase.google.com/docs/firestore/manage-data/export-import>
<https://firebase.google.com/docs/firestore/solutions/schedule-export>
<https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules>

<!--EndFragment-->
