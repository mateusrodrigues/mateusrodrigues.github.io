---
title: How I built my own Dropbox-like server using NextCloud
date: '2017-03-11 11:43:26'
category: Life Hacks
tags: cloud storage dropbox nextcloud
---

When Dropbox was first introduced to the world, I became a faithful customer. I loved the service, the idea, the safety and reliability of having my files available both locally and remotely. I no longer had to worry about lengthy backups and system images, anticipating the failure of my hard drive.

Years later, we now have several services that offer free cloud storage -- [OneDrive](http://onedrive.live.com), [Google Drive](http://drive.google.com), [Dropbox](http://dropbox.com), etc. Each having their own free storage caps for you to use to your heart's content. If you need more, you can always pay for it.

But then it occurred to me: _paying is just way too easy!_

That's when I started researching on services I could install on a VM to turn it into a cloud storage server, and I came across [NextCloud](http://nextcloud.com). NextCloud is an **Open Source** project maintained openly on GitHub that focuses on providing the software to build online storage services with lots of other possibilities through extensions, both for home and the enterprise.

Great! I have my tool of choice. Let's get to work.

## Step 1: Create a Virtual Machine

My cloud platform of choice is **Microsoft Azure**. Of course, you can do this anywhere -- even locally, on your own box. As I'm only going to use this server for sporadic backups, I built a machine with a single processor core and 1.75 GB of RAM. This should be enough. And it runs **CentOS Linux** (this was my choice, but you can use virtually any Linux distribution).

![My Azure VM](/images/dropbox-like-server/azure-vm.PNG)

## Step 2: Install NextCloud

After your machine is nice and deployed, SSH into it and run some commands. As the commands are already arranged and available in a nice guide provided by the Vultr documentation, I'm going to redirect you to it by clicking [here](https://www.vultr.com/docs/how-to-install-nextcloud-on-centos-7). Make sure to come back when you're done.

## Step 3: Fix the SELinux permissions (if they bother you)

You might notice that after setting your permissions, you may start getting 403 Forbidden errors when trying to access your server from a browser. After extensive research and multiple Google search queries, I found this [nice answer](https://serverfault.com/questions/650402/403-forbidden-errors-on-redhat-server/650414#650414) on StackOverflow (where else, right?) explaining why that was.

Long story short: SELinux permissions are messing with you. I personally decided to set the SELinux policy to _permissive_ by default, you may prefer to go through a better path according to your needs, that's your choice. What I did was:

```
$ sudo setenforce 0
```

And it all came back to life. Try accessing your server now!

This won't survive through a reboot, though. So you need to open `/etc/selinux/config` and change the line that says `SELINUX=...` to `SELINUX=permissive`.

## Step 4: Configure your Apache server

In this step, we'll setup your server name in your Apache configuration file so that the next step can be done the easiest way. Run:

```
$ sudo vim /etc/httpd/conf.d/ssl.conf
```

When the file opens, look for the following structure and change your server name to best reflect your domain configuration -- of course, replacing `yourdomain.com` with your actual domain name:

```
<VirtualHost _default_:443>
   . . .
   ServerName yourdomain.com
   . . .
</VirtualHost>
```

Then, check for any syntax errors

```
$ sudo apache2ctl configtest
```

The expected output should be 

```
Output
Syntax OK
```

## Step 5: Get yourself an SSL certificate!

No good to have a cloud backup when your files are running free through HTTP for everyone to see, right? Let's put Let's Encrypt into action. I personally used the [Certbot](https://certbot.eff.org) software to automatically install and renew the certificate for me by following the instructions provided [here](https://certbot.eff.org/#centosrhel7-apache). I also configured my Apache server to redirect all port 80 (HTTP) traffic to port 443 (HTTPS). This is done automatically during the installation process IF you say so. In case you missed it, just do the following:

```
$ sudo vim /etc/httpd/conf.d/non-ssl.conf
```

And then add the following content to the newly created file -- replacing `yourdomain.com` with your actual domain name:

```
<VirtualHost *:80>
        ServerName yourdomain.com
        Redirect "/" "https://yourdomain.com/"
</VirtualHost>
```

Save: `:x`

Then, check for any syntax errors again

```
$ sudo apache2ctl configtest
```

## You're done!

Awesome! You should have your file storage running perfectly now. Go ahead and try out their desktop client as well as their mobile apps. They should be no different than any other client from any mainstream storage service -- except now you control how much storage you are allowed to have! :wink: