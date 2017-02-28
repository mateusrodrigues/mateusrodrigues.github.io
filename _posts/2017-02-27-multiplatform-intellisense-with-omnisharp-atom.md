---
title: Multiplatform IntelliSense with OmniSharp + Atom
date: '2017-02-27 07:35:59'
category: ".NET"
tags: ".net development multiplatform intellisense"
---

There are two types of programmers in this world. The IDE-lover, who prefers to use more robust and complete environments to code. And the Editor-lover, who prefers to code in a more clean slate. So, let’s focus a bit on the latter. Editors are among the most common ways of writing code nowadays.

Our beloved friend .NET is also adapting to this rather uncalled for transition. The first sign of that is the launch of [Visual Studio Code](http://code.visualstudio.com): an open source and multiplatform code editor developed by Microsoft and part of the Visual Studio family. But as .NET developers transition to this new world, some things start to lack. IntelliSense being one of them.

In order to overcome that, a group of developers started an open source side project that had the goal of bringing Visual Studio’s well-known IntelliSense feature to other platforms and editors. Right now, it supports Atom, Emacs, Vim, Sublime, among others. It runs on top of the Mono Framework, but it is being ported to the new .NET Core framework -- which is also open source and multiplatform.

One thing, though, is unquestionable: the need for this feature. C# and .NET are becoming even more ubiquitous these days: as Microsoft bought Xamarin and with the advent of the new multiplatform .NET Core and ASP.NET Core, platforms are losing their weight in the equation, meaning, it doesn’t really matter which one you use. But as the full-fledged Visual Studio IDE is only available on Windows, something has to be done to bring IntelliSense to other environments.

That’s when OmniSharp comes into play. It differs from what Sublime and Atom bring by default, because they are not an intelligent completion feature, it’s just plain old autocomplete. It knows you’ve typed something before, and it suggests it again. It doesn’t know, for example, whether a variable is a string or an int, so that it can show the right properties and methods for you. OmniSharp, however, is intelligent. And useful.

## So, how can I start using OminSharp?
Well, Visual Studio Code already brings it by default. If you open a C# project, it will already start suggesting intelligently for you. Let’s take a look at an example:

### Visual Studio Code
In a new C# project, we have a variable called i of type string. Whenever I type `i.`, IntelliSense -- or OmniSharp, in this case -- will automatically detect the type of the variable `i` and present *stringy* things that I can do with it.

![](/images/multiplatform-intellisense-with-omnisharp-atom/Screen-Shot-2015-10-30-at-2.23.48-PM.png)

And, if I change the type of the variable to, say, `List<string>`, it’ll present *Listy* things:

![](/images/multiplatform-intellisense-with-omnisharp-atom/Screen-Shot-2015-10-30-at-2.24.37-PM.png)

### Atom

In case you don’t use Visual Studio Code, there are ways to bring OmniSharp to your editor of preference. Let’s use Atom as an example.

In the package install interface, look for `omnisharp-atom` and install it. In the process, it’ll bring its dependencies and you should be good to go.

![](/images/multiplatform-intellisense-with-omnisharp-atom/Screen-Shot-2015-10-30-at-2.51.02-PM.png)

Whenever you open a C# file, the OmniSharp server should fire up and everything should work as expected:

When `i` is a `string`:

![](/images/multiplatform-intellisense-with-omnisharp-atom/Screen-Shot-2015-10-30-at-2.57.53-PM.png)

And when `i` is a list of strings -- yes! It even recognizes the object type of a given generic class!

![](/images/multiplatform-intellisense-with-omnisharp-atom/Screen-Shot-2015-10-30-at-2.58.21-PM.png)

If you take a closer look at the status bar on the bottom of the screen, the little green fire icon means the OmniSharp server is up, there’s also the number of errors in your code, the number of projects in the open folder, and some other info.

![](/images/multiplatform-intellisense-with-omnisharp-atom/Screen-Shot-2015-10-30-at-2.58.21-PM-1.png)

## How can I find out more?

Simple! Just surf to [omnisharp.net](http://omnisharp.net) and find more info and instructions on how OmniSharp works, how you can contribute to the project and, of course, how to install it on your favorite editor.