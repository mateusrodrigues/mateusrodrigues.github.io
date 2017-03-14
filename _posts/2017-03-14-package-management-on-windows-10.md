---
title: Package Management on Windows 10
---

Many users, even beginners, of Linux or Mac OS are already familiar with the concept or Package Managers. We can, right off the bat, cite a few, such as apt-get, for Linux distributions based on Debian, and Homebrew, for Mac OS X. However, in the Windows world there are many software installation technologies, each one with their own way of functioning (MSI, MSU, APPX, etc.), but that are never as easy as typing a simple command on a CLI window in order to make it happen. This kind of granularity makes it harder, for example, for system admins to have a simplified way of deploying software to many computers in a single run.

As a way to fix this problem, OneGet came into existence. Contrary to what is commonly said out there, OneGet is not simply a package manager, like apt-get, but a package manager manager - which makes it a lot cooler! - that means, doesn't matter the technology behind the software installer (MSI, MSU, whatever), OneGet will understand it and will install it with a single PowerShell command.

## So, I've heard of this thing called Chocolatey. How does it fit into the equation?

It is important to understand that Chocolatey works the same way as apt-get does, except for Windows. But, the proposal that OneGet brings onto the table is not to provide software from a single source or technology, but from several! That means, you can install your software via command-line interface, doesn't matter whether they are MSI-wrapped or even from Chocolatey's own repository.

The process of "understanding" how an installation should be done is the responsibility of these things called providers. Each technology is supposed to have their own providers - the MSI, MSU, NuGet or Chocolatey provider - and these providers utilize an API to teach the package manager how to install them correctly. The architecture is as follows: