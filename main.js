import EventManager from "./EventManager.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000000";

window.EventManager = EventManager;
window.CEM = new EventManager(canvas);

ctx.fillRect(0, 0, 200, 200);
CEM.addDirectListener("click", {
  x: 0, y: 0, width: 200, height: 200
}, function(e) {
  alert(e);
}, "listener 1");

const dimensions = new CEM.BoxDimensions(100, 300, 200, 200);

ctx.fillRect(100, 300, 200, 200);
CEM.addDirectListener("mousemove", dimensions, function(e) {
  alert(e);
}, "listener 2");

CEM.removeDirectListener("listener 2");

window.element = new CEM.BoxElement(new CEM.BoxDimensions(0, 0, 100, 100));

//setInterval(() => console.log(CEM.isInputActive("KeyD"), CEM.isInputActive("LeftMouse"), CEM.isInputActive("RightMouse"), CEM.mousePositionX, CEM.mousePositionY), 1200);