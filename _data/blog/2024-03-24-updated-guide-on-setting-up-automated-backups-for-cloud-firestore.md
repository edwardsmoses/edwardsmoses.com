---
template: BlogPost
path: /updated-guide-on-setting-up-automated-backups-cloud-firestore
date: 2024-03-28T20:20:01.203Z
title: Updated Guide on setting up Automated Backups for Cloud Firestore
metaDescription: Protect Firestore data with scheduled native backups, restore paths, and an ops checklist for production apps.
thumbnail: /assets/edwards-moses-pexels-pixabay-270348.jpg
---

<!--StartFragment-->

In a previous [article](https://edwardsmoses.com/automated-backups-cloud-firestore), we explored how to setup automated backups for Firestore database, but recently Google released a [new feature](https://firebase.google.com/docs/firestore/backups) that allows for creating backups for your Firestore data.

This article, we'd be exploring how to setup automated daily Firestore backups, without the need of coding.

## Introduction to Automated Backups

We use the new `gcloud` command: `gcloud alpha firestore backups` to initiate and manage the backups, so billing should be enabled on your Firebase Project.

### Setting up the Backup Schedule

We want to create a schedule to run daily:

``` bash
gcloud alpha firestore backups schedules create \
--database='your-database-name' \
--recurrence=daily \
--retention=5w
```

Where:

- `your-database-name` is the name of the Firestore database we want to backup. If you're using the default Firestore instance, it's likely to be `(default)`
- `5w` is how long we want to keep this backup for, this value can be setup up to 14 weeks.

![Firestore backup schedule creation output](/assets/firestore-backup-schedule-created.png)

## Verifying the Setup

To confirm that the schedule was succesfull, you can run the below command to display a list of backup schedules:

```bash
gcloud alpha firestore backups schedules list \
--database='(default)'
```

![Firestore backup schedule list output](/assets/firestore-backup-schedule-list.png)

## Viewing Available Backups

And, lastly, we can see the available backups for the Firestore database.

```bash
gcloud alpha firestore backups list \
--format="table(name, database, state)"

```

## Conclusion

The introduction of ths new commands has significantly simplified the process of setting up automated backups for Firestore.
By following the steps in this guide, you should have an automated backup system up and running.

<!--EndFragment-->
