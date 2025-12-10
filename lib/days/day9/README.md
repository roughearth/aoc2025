# Day 9

Part 2 was _HARD_. It took me a while to get an algorithm that would run in a reasonable time. In the end I had to resort to the Subreddit, and went brute force having "compressed" the coordinates. (ie represent each coordinate by its index in the sorted list of unique values).

Even then it wasn't right. Eventually I tracked that down to incorrect area calculation (wrongly accounting for reverse directions). Just lucky that it worked for part 1!
