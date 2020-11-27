# **DOCUMENTATION**

## Setup

Upload [this](https://Canvas-event-manager.lilpeen.repl.co/EventManager.js) JS file to your file system and import the file:
```js
import EventManager from "EventManager.js";
```

## Usage

Create a new event manager object:
```js
import CanvasEventManager from "EventManager.js";

const CEM = new CanvasEventManager(

  /*DOM element: your canvas element*/
  document.getElementById("canvasID"),

);
```

## Event manager properties

**canvas**
DOM element
```js
CEM.canvas
```
The attached canvas element

---

**canvasElements**
array
```js
CEM.canvasElements
```
All current elements linked to the canvas

---

**contextMenuDisabled**
boolean
```js
CEM.contextMenuDisabled
```
Set to true to enable the context menu. Set to false by default.

---

**mousePositionX**/**mousePositionY**
null or integer
```js
CEM.mousePositionX
CEM.mousePositionY
```
The current x/y location of the mouse pointer in pixels. null by default

---

## Event manager methods

**addDirectListener**
```js
CEM.addDirectListener(
  
  /*string: event name*/
  "click",

  /*object: dimensions*/
  {
    100, // x location in pixels
    100, // y location in pixels
    200, // width in pixels
    200, // height in pixels
  },

  /*function: listener function*/
  function(event) {
    console.log(event.type)
  },

  /*optional, string or integer: name*/
  "listener 1"

);
```
Adds an event listener of the specified type to a canvas area. Only events with offsetX and offsetY properties are supported.

Returns undefined.

---

**removeDirectListener**
```js
CEM.removeDirectListener(

  /*string or integer: name*/
  "listener 1"

);
```
Removes all listeners with the specified name.

Returns true if at least 1 element was removed, false if none were removed.

---

**isInputActive**
```js
CEM.isInputActive(

  /*string: keyboard event code, LeftMouse or RightMouse*/
  "KeyW"

);
//returns true if the W key is currently being pressed

CEM.isInputActive(

  /*string: input name*/
  "LeftMouse"

);
//returns true if the left mouse is currently being pressed

CEM.isInputActive(

  /*string: input name*/
  "RightMouse"

);
//returns true if the right mouse is currently being pressed
```
Detects if specified input is currently being pressed.

Returns true if input is down, false if input is up.

Keyboard event codes can be found [here](https://keycode.info/).