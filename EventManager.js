export default class EventManager {
  constructor(canvas, offsetX, offsetY) {
    if (typeof offsetX !== "number" || typeof offsetY !== "number") {
      throw new TypeError("Invalid offsets. Offsets must be numbers.");
    }

    this.offsetX = offsetX;
    this.offsetY = offsetY;

    this.canvas = canvas;

    this._doNotTouch = {
      events: [],
      eventFunctions: [],
    };
  }

  addListener(type, dimensions, func, name) {
    if (typeof name !== "string") {
      name = "";
    }

    if (this._doNotTouch.events.includes(type)) {
      this._doNotTouch.eventFunctions.push({
        func,
        dimensions,
        name,
      });
    } else {
      this._doNotTouch.events.push(type);
      
      this._doNotTouch.eventFunctions.push({
        func,
        dimensions,
      });

      this.canvas.addEventListener(type, e => {
        if (e.offsetX === undefined) {
          throw new TypeError("Event type not supported.");
        }

        this._doNotTouch.eventFunctions.forEach(object => {
          const dimensions = object.dimensions;

          if (
            e.offsetX - this.offsetX > dimensions.x
            && e.offsetX - this.offsetX < 
              dimensions.x + dimensions.width

            &&e.offsetY - this.offsetY > dimensions.y
            && e.offsetY - this.offsetY < 
              dimensions.y + dimensions.height
          ) {
            object.func(e);
          }
        });
      });
    }
  }

  removeListener(name) {
    this._doNotTouch.eventFunctions.forEach((object, index) => {
      if (object.name === name) {
        eventFunctions.splice(index, 1);
      }
    });
  }

  get events() {
    return this._doNotTouch.eventFunctions;
  }
}