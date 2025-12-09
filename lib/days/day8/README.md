# Day 8

No `cleanAndParse` again, but not for a good reason.

I like the intricacy of this one. I did it brute force, so it's slow, but it works.

* Precalculate all the pairwise distances.
* Loop over all the pairs in order of increasing distance, adding to an existing circuit if possible, or starting a new one if not. Not forgetting to connect two existing circuits if needed.
* Loop terminates after 1000 pairs for part 1, or whan all points are connected for part 2.


I think there might be better algorithms for this problem, but I don't know them.


