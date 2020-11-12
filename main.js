import EventManager from "./EventManager.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, 200, 200);
ctx.fillRect(100, 300, 200, 200);

window.manager = new EventManager(canvas, 100, 100);

manager.addListener("click", {
  x: 0, y: 0, width: 200, height: 200
}, function(e) {
  alert(e);
});

manager.addListener("mousemove", {
  x: 100, y: 300, width: 200, height: 200
}, function(e) {
  alert(e);
});