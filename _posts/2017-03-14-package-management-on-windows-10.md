---
title: Package Management on Windows 10
date: '2017-03-14 11:07:55'
category: Windows 10
tags: windows-10 package-management sysadmin
---

Many users, even beginners, of Linux or Mac OS are already familiar with the concept or Package Managers. We can, right off the bat, cite a few, such as apt-get, for Linux distributions based on Debian, and Homebrew, for Mac OS X. However, in the Windows world there are many software installation technologies, each one with their own way of functioning (MSI, MSU, APPX, etc.), but that are never as easy as typing a simple command on a CLI window in order to make it happen. This kind of granularity makes it harder, for example, for system admins to have a simplified way of deploying software to many computers in a single run.

As a way to fix this problem, OneGet came into existence. Contrary to what is commonly said out there, OneGet is not simply a package manager, like apt-get, but a package manager manager - which makes it a lot cooler! - that means, doesn't matter the technology behind the software installer (MSI, MSU, whatever), OneGet will understand it and will install it with a single PowerShell command.

## So, I've heard of this thing called Chocolatey. How does it fit into the equation?

It is important to understand that Chocolatey works the same way as apt-get does, except for Windows. But, the proposal that OneGet brings onto the table is not to provide software from a single source or technology, but from several! That means, you can install your software via command-line interface, doesn't matter whether they are MSI-wrapped or even from Chocolatey's own repository.

The process of "understanding" how an installation should be done is the responsibility of these things called providers. Each technology is supposed to have their own providers - the MSI, MSU, NuGet or Chocolatey provider - and these providers utilize an API to teach the package manager how to install them correctly. The architecture is as follows:

![OneGet Architecture](/images/windows-10-package-management/OneGet-Architecture.png)

Yes. OneGet is a PowerShell module, therefore, all of the software management is made using Cmdlets. Important: OneGet is an open source project that can be found on [GitHub](https://github.com/oneget/oneget). What happened, then, was that Microsoft wrapped up its own instance of OneGet as PackageManagement and shipped it with Windows 10. So, the module is called PackageManagement and not OneGet – just as Google wrapped up its own implementation of the Chromium project as Chrome.

## Understanding PackageManagement in practice

To start, let’s take a look at the commands made available to us inside the PackageManagement module:

{% highlight powershell %}
Get-Command –Module PackageManagement | sort noun, verb
{% endhighlight %}

![Get-Command -Module PackageManagement](/images/windows-10-package-management/Get-Command-Module-PackageManagement.png)

These are all the commands that we can run. They are very self-explanatory and easy to use -- just as easy as apt-get!

There are three levels of managing: package, package provider and package source.

- *Package*: Manage packages, whether they are already installed or not.
- *Package provider*: Manage the providers available in your current installation of PackageManager.
- *Package source*: Manage the repositories of packages where PackageManager will look for software.

Now, let us see what providers we have available right now:

{% highlight powershell %}
Get-PackageProvider
{% endhighlight %}

![Get-PackageProvider](/images/windows-10-package-management/Get-PackageProvider.png)

From the providers we have, we can see that installing MSI, MSU or NuGet packages should be fine.

And where do these packages come from? Let’s find out from the currently installed repositories:

{% highlight powershell %}
Get-PackageSource
{% endhighlight %}

![Get-PackageSource](/images/windows-10-package-management/Get-PackageSource.png)

Right now, we can look for packages on NuGet.org and the PowerShell Gallery.

## Installing WinRAR via PackageManagement

It’s time to do something significant with all this power. Let’s install WinRAR! Of course, we could just as simply open the Windows Store and do that. What fun would that be, though?

Before anything, make sure to open your PowerShell window as **Administrator**.

First of all, we have to install the Chocolatey provider, because the WinRAR installer we are going to use is in that format.

{% highlight powershell %}
Get-PackageProvider –Name Chocolatey
{% endhighlight %}

**Attention**: if you are installing a package for the first time, you’ll be prompted about installing NuGet. Just type *Y* for Yes and move on. Whenever you are prompted to download and install the Chocolatey provider, just do the same: press *Y*.

After installing the provider, we should be good to go:

{% highlight powershell %}
Install-Package WinRAR
{% endhighlight %}

![Get-PackageProvider](/images/windows-10-package-management/Get-PackageProvider-Name-Chocolatey.png)

![Install-Package-WinRAR](/images/windows-10-package-management/Install-Package-WinRAR.png)

The output doesn’t show any sign of error, so the installation should be complete by now.

![WinRAR](/images/windows-10-package-management/WinRAR.png)

Just like a regular install, the program should be accessible through the Start menu and completely integrated into the system -- with context menus and all. The uninstall can also be run using the ‘Add or Remove Programs’ option in the Settings window, or, of course, using PowerShell! Both work the same way.

![Uninstall-WinRAR](/images/windows-10-package-management/Uninstall-WinRAR.png)

To uninstall using the command-line interface, type in:

{% highlight powershell %}
Uninstall-Package WinRAR
{% endhighlight %}

![Uninstall-Package-WinRAR](/images/windows-10-package-management/Uninstall-Package-WinRAR.png)

And, it’s done:

![AddRemove-Empty](/images/windows-10-package-management/AddRemove-Empty-WinRAR.png)

For a complete listing of the programs currently installed on the computer, use `Get-Package`. You can also filter by provider using the argument `-Provider`. For example, we just installed WinRAR and we want to see all programs downloaded using the Chocolatey provider. So we would type:

{% highlight powershell %}
Get-Package –Provider Chocolatey
{% endhighlight %}

![Get-Provider-Chocolatey](/images/windows-10-package-management/Get-Package-Provider-Chocolatey.png)

There is also a special provider called `Programs`. With it, it is possible to list all packages installed on the computer just like in ‘Add or Remove Programs’:

{% highlight powershell %}
Get-Package –Provider Programs | sort Name
{% endhighlight %}

As we are dealing with a very long list, I suggest you use `sort Name` to return the packages in alphabetical order. Remember that we are using PowerShell, you can order and/or format the output to your heart’s content!

## Troubleshooting

If you had any kind of problem during the installation, verify if the execution policy of your PowerShell instance is set to `RemoteSigned`. For that, you can execute the command `Get-ExecutionPolicy`. In case it’s not, type in the following command to change that:

{% highlight powershell %}
Set-ExecutionPolicy –ExecutionPolicy RemoteSigned
{% endhighlight %}

Verify, also, if you PowerShell session is being run as **administrator**. If it isn't, just close it, right-click on the PowerShell icon and choose ‘Run as Administrator’.

## I don’t have Windows 10. Can I also use PackageManagement?

Yes! The PowerShell module will be made available in two ways:

- In the [Windows Management Framework 5.0 Preview](http://www.microsoft.com/en-us/download/details.aspx?id=46889), which supports older versions of Windows down to Windows 7 and Windows Server 2008 R2.
- PackageManagement will also be available as an MSI package as soon as its stable version is released. Microsoft states that this version will be updated quite frequently. A preview version is available as of March 2016 on this [link](https://blogs.msdn.microsoft.com/powershell/2016/03/08/package-management-preview-march-2016-for-powershell-4-3-is-now-available/).

But, of course, the most recommended way to have access to PackageManager is via the upgrade to Windows 10.

## Where can I know more?

In case you want to go deeper on the subject, access the [Official TechNet documentation of PackageManager](https://technet.microsoft.com/en-us/library/dn890706.aspx).

Also, if you want to contribute or have the curiosity to check out OneGet, the source code is available on the [official OneGet repository on GitHub](https://github.com/oneget/oneget).

For more general questions, suggestions or random comments, please leave your comment or, as always, shoot me an email!

See you all next time!