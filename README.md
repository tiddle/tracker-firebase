# Tracking and Displaying

## Proof of concept for tracking and displaying on another page

If you open two index.html files on the server one with a index.html#/?watch=true
param you'll see the events coming in.

Obviously not everything works in a 1 to 1 manner but it's pretty close.

It uses firebase to store and retrieve the data, it does most of the heavy lifting.

All this is missing is the functionality to translate what i've recorded
into visual display. Since it's being recorded in real time and the data being
accessed in real time the playback will be in real time.

Timestamps are also recorded so that it can be replayed at a later date.

The only thing I haven't figured out are actual mouse over states like hover state
and click events