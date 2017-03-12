---
title: How I built my own Dropbox-like server
date: '2017-03-11 11:43:26'
category: Life Hacks
tags: cloud storage dropbox nextcloud
---

When Dropbox was first introduced to the world, I became a faithful customer. I loved the service, the idea, the safety and reliability of having my files available both locally and remotely. I no longer had to worry about lengthy backups and system images anticipating the failure of my hard drive.

Years later, we now have several services that offer free cloud storage -- [OneDrive](http://onedrive.live.com), [Google Drive](http://drive.google.com), [Dropbox](http://dropbox.com), etc. They have each their own free storage caps for you to use to your heart's content. If you want more storage, you can always pay for it. But then I thought: _paying is just too easy, right!?_

That's when I started researching on services I could install on a VM to turn it into a cloud storage server, and I came across [NextCloud](http://nextcloud.com). NextCloud is an Open Source project maintained openly on GitHub that focuses on providing software to build online storage services with lots of other possibilities through extensions, both for home and the enterprise.

Great! I have my tool of choice. Let's get to work.

## Step 1: Create a Virtual Machine

My cloud platform of choice is Microsoft Azure. Of course, you can do this anywhere, even locally, on your own box. As I'm not going to use this very heavily, I built a machine with 1 processor core and 1.75 GB of RAM. This should be enough. Oh! And it runs CentOS Linux (this was my choice, but you can get virtually any Linux distribution).