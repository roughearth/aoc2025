# Day 7


Oooh, _another_ day without using `cleanAndParse`!

Parts 2 stumped me for a bit. I got hung up on making a graph and DFSing it.

The logic goes like this.

* start with the source beam, which only has 1 route to itself.
* Go down the grid row by row, and every time you hit a splitter, drop that beam and make 2 new ones.
  * Here's the key, if there is already a beam in that column, add the number of routes from the beam being split to the existing beam. This makes sure that combined beams get appropriately weighted.
  * Also, count the number of times you split a beam for part 1.