# solarsystem
basic three js solar system
# What is this?
its a solar system simulation made using three.js to use as an animated wallpaper for my upcoming webOS.

# how to use
use these postMessage types to control the simulation from an iframe parent:
- `getCanvasSize`: posts another message typed `canvasSize` with the width and height properties of the canvas
- `speed`: sets speed to `value`
- `hideui`: hides #ui

you can iframe this in any website (thats how i use it as a wallpaper) if you do this:
1. post a message typed `hideui` first
2. make sure to set the width and height of the iframe to the full innerWidth and innerHeight
3. when resizing use `iframe.src = iframe.src` then post `getCanvasSize` after changing the width and height
4. add an event listener that listens for `canvasSize` and does `iframe.src=iframe.src` then posts `getCanvasSize` again if the width and height are 0px

