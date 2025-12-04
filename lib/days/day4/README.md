# Day 4

Rolled out my `grid` utilities today.

Pretty straightforward, but I was disappointed in the performance of part 2 (2 seconds!), so I refactored to avoid re-scanning the entire grid each iteration. Instead, I just keep track of the rolls still on the grid. This brought it down to 800ms, which is  better, but still not great.
