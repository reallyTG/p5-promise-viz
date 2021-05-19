# p5-promise-viz
P5 for promise visualization. 

# Instructions

1. clone repository `git clone https://github.com/reallyTG/p5-promise-viz.git`
2. Start local http server 
	- Note: We have to use a server because we are loading file data from JavaScript
	- Using PHP
		- e.g. `php -s localhost:1024`) from the directory where index.html resides
	- Using Python3
		- e.g. `python3 -m http.server 1024` from the directory where index.html resides
	- Using Python2
		- e.g. `python -m SimpleHTTPServer 1024` from the directory where index.html resides
3. Start webbrowser at local http address (e.g. `localhost:1024` in the browser bar)
4. Note: Sometimes visualization gets cached, try opening incognito if the visualization has not changed.

# Links related to this project

1. [Overleaf paper with edit access](https://www.overleaf.com/project/6058be88a518dd1d47dc9d76)
	- **This is where everything eventually needs to go**
2. https://docs.google.com/spreadsheets/d/1OmBX5fRUwys8eQI7Ome6Y1vFS5uo6ofk7p17HBVIIbU/edit#gid=0
	- This is slightly older when Mark was active on the project.
3. [AsyncAwaitBenchmarks Github Repo](https://github.ccs.neu.edu/optimizing-async-await/AsyncAwaitBenchmarks)
	- Old repository where we were going to write paper.
4. [ProfilingPromisesExamples](https://github.ccs.neu.edu/alexi/ProfilingPromisesExamples)
 	- Repository with small examples
5. [manifest](https://github.com/JSPromiseProfiling/manifest)
 	- Benchmarks in this project


# E-mails of importance (By Subject)

0. Promise-Resolve-Then Pattern Example (from Alexi)
1. explicit promisification anti-pattern (from Frank)
2. additional anti-pattern to look for in the promise profiling project (from Frank)
	-  https://stackoverflow.com/questions/23803743/what-is-the-explicit-promise-construction-antipattern-and-how-do-i-avoid-it
3. found the issue in CodeceptJS! (from Frank)
4. Profilin': Update on CodeceptJS (From Alexi)
5. Profilin' Brief Update (From Alexi)
	- Await-in-a-loop pattern
6. what "await 7" is translated into (from Frank)
7. another pattern: awaiting a value (from Frank)
8. explaining the "airplane tail" diagram (from Frank)
9. Profiling Promises Results from today's meeting (from Mark)
10. references - blog posts, etc. relevant for profiling project (from Frank)

# Patterns and Benchmarks

1. Sequential
	- Description: Completely Sequential (no asynchronicity at all)
	- Project(s) Showing pattern:
		- Project 1 ...
		- Project 2 ...
2. testrunner
 	- Description: One long running promise with many smaller promises.
	- Project(s) Showing pattern:
		- Project 1 ...
		- Project 2 ...
3. airplane
	- Description: 
	- See E-mail: explaining the "airplane tail" diagram
 	- Project(s) Showing pattern:
		- Project 1 ...
		- Project 2 ...
4. Await-in-a-loop pattern
	- Description: 
	- See E-mail: Profilin' Brief Update (From Alexi)
	- Project(s) Showing pattern:
		- Project 1 ...
		- Project 2 ...
5. Awaiting a value
	- Description: 
	- See E-mail: another pattern: awaiting a value (from Frank)
	- Project(s) Showing pattern:
		- Project 1 ...
		- Project 2 ...
6. Barrier Pattern
	- Description:
	- See E-mail: Profiling Promises Results from today's meeting (from Mark)
	- Project(s) Showing pattern:
		- Project 1 ...
		- Project 2 ... 


## Useful Related work

1. [Don’t Call Us, We’ll Call You:
Characterizing Callbacks in JavaScript](https://www.cs.ubc.ca/~bestchai/papers/esem15-js-callbacks-study.pdf)
	- Code repositories for paper: https://github.com/saltlab/CallMeBack
	- "stats" directory has some projects listed that should be useful.
	- The paper highlights a few metrics we may want to eventually capture as well ('how nested async calls are', '% of functions that are async')
2. A study and toolkit for asynchronous programming in C#
	- See e-mail from Alexi: Fwd: link to the C# paper
3. Analyzing Async Calls﻿
	- https://www.jetbrains.com/help/profiler/Analyzing_Async_Calls.html
4. Timelane 2
 	- https://timelane.tools/



### Dump of related work from Frank

#### blog posts, etc. related to profiling/visualizing the execution of concurrent code:

- https://docs.microsoft.com/en-us/visualstudio/profiling/concurrency-visualizer?view=vs-2019
- https://blogs.oracle.com/nbprofiler/profiling-with-visualvm,-part-1
- https://devblogs.microsoft.com/cppblog/concurrency-code-analysis-in-visual-studio-2019/
- https://www.drdobbs.com/windows/visualizing-parallelism-and-concurrency/220900288
- https://docs.oracle.com/javase/8/docs/technotes/guides/visualvm/profiler.html
- https://visualstudiomagazine.com/articles/2017/10/01/code-analysis.aspx
- https://marketplace.visualstudio.com/items?itemName=Diagnostics.ConcurrencyVisualizer2017
- https://www.jetbrains.com/dotnet/
- https://www.baeldung.com/java-profilers
- https://adamsitnik.com/ConcurrencyVisualizer-Profiler/
 -http://hydronitrogen.com/profiling-a-running-jvm-tools-you-should-know.html
 
#### blog posts, etc. related to profiling async code:

- https://hackernoon.com/profiling-java-applications-with-async-profiler-049s2790
- https://dzone.com/articles/c-async-await-tasks-support-and-visualize-performa
- https://blog.jetbrains.com/dotnet/2017/11/22/analyzing-performance-asynchronous-net-code-dottrace/
- https://github.com/jvm-profiling-tools/async-profiler
- https://stackify.com/csharp-async-await-task-performance/
- https://www.jetbrains.com/help/profiler/Analyzing_Async_Calls.html
- https://github.com/ConradIrwin/async-profile
- https://i-rant.arnaudbos.com/loom-part-3-async/
- https://stackify.com/when-to-use-asynchronous-programming/  // probably more relevant for Satya’s project
- https://docs.microsoft.com/en-us/dotnet/csharp/async // info about async/await in C#
- https://developer.mozilla.org/en-US/docs/Tools/Performance/Flame_Chart
- https://github.com/sumerc/yappi
- https://www.jetbrains.com/help/rider/Profiling_Applications.html
