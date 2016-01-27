# js-async-patterns
Async Patterns in Javascript

A showcase of various async patterns available in Javascript. Although each pattern or abstraction examined here is not directly comparable with the other (some even depend on others), the idea is to tackle the same scenarios with all of them.

Inspired by a great [forward](http://forwardconference.org) workshop on async Javascript from [Kyle Simpson](http://getify.me)

## Scenarios
2 basic scenarios so far. Can't tell which is worse.

### South Park
A sequence of discrete asynchronous steps.

`A` -> (`B + C`) -> `D`

`A` followed by `B` and `C` which run in parallel and in turn followed by `D`

Ok let's make up a scenario that serves our purpose. Let's say we have a South Park fan site where we let people view the profiles of the various characters in the series. But we choose our data wisely, in the true spirit of the series, if the character has any bad reputation we want to enrich his/her profile with the episodes he/she is known for. We can tell bad reputation from the number of friends and the existence of a criminal record. Yes that is what I came up with at 2:00am. Took me some time as well!

* step1 (A): get basic profile `{name, bio, spdb_url}` from another fictitious `imdb.com/:hero` service. `spdb` comes from south park db :)
* step2 (B + C): get number of friends from `<spdb_url>/friends` and criminal record from `<spdb_url>/record` and merge with profile
* step3 (D): if the character has bad reputation fetch the episodes that made him famous from `<spdb_url>/known_for` and add them to his profile.

We'll start with Eric Cartman.

### Aragorn Lineage
Repeated application of the same async step until a terminating condition is met.
This is also a sequence of async steps but one that can be solved using
recursion or loop depending on the async mechanism employed.

We need to print out Aragorn's lineage. A fictitious `lotr.com/:name` API provides us with `{title, ancestor}` records with the `title` being the title of the LOTR hero and `ancestor` the name of their ancestor. We are given the Aragorn's one `lotr.com/aragorn` to start with.
