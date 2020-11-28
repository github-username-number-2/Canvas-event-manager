//need to remove private properties as they are safari incompatible

const supportedEvents = ["click", "mousemove"];

class Element {
  _doNotTouch = {
    symbol: Symbol(),
    listeners: [],
  };

  constructor(dimensions) {
    if (typeof dimensions !== "object") {
      throw new TypeError("Element dimensions must be an object.");
    }

    this.dimensions = { ...dimensions };
  }

  addEventListener(eventName) {
    if (typeof eventName !== "string") {
      throw new TypeError("Event type must be a string.");
    }
  }

  removeEventListener(eventName) {
    if (typeof eventName !== "string") {
      throw new TypeError("Event type must be a string.");
    }
  }

  remove() {
    //
  }
};


export default class EventManager {
  _doNotTouch = {
    events: [],
    eventFunctions: [],

    eventsPrivate: [],
    eventFunctionsPrivate: [],

    elementIDIndex: 0,

    activeInputs: {},

    canvasElements: [],
  };

  //prevents changing of the attached canvas element
  get canvas() {
    return this._doNotTouch.canvas;
  }

  //prevents changing of the linked canvas elements
  get canvasElements() {
    return [...this._doNotTouch.canvasElements];
  }

  contextMenuDisabled = true;

  mousePositionX = null;
  mousePositionY = null;

  constructor(canvas) {
    if (
      !(typeof HTMLElement === "object"
        ? canvas instanceof HTMLElement
        : canvas
        && typeof canvas === "object"
        && canvas !== null
        && canvas.nodeType === 1
        && typeof canvas.nodeName === "string")
    ) throw new TypeError("Argument must be a canvas element.");

    this._doNotTouch.canvas = canvas;

    canvas.tabIndex = 0;

    canvas.addEventListener("contextmenu", event =>
      this.rightClickDisabled && event.preventDefault()
    );

    canvas.addEventListener("mousemove", event => {
      this.mousePositionX = event.offsetX;
      this.mousePositionY = event.offsetY;
    });

    canvas.addEventListener("keydown", event =>
      this._doNotTouch.activeInputs[event.code] = true
    );
    canvas.addEventListener("keyup", event =>
      this._doNotTouch.activeInputs[event.code] = false
    );

    canvas.addEventListener("mousedown", event =>
      this._doNotTouch.activeInputs[["LeftMouse", "RightMouse"][event.button / 2]] = true
    );

    canvas.addEventListener("mouseup", event =>
      this._doNotTouch.activeInputs["LeftMouse"] = this._doNotTouch.activeInputs["RightMouse"] = false
    );

    this.addEventListener = canvas.addEventListener;
    this.removeEventListener = canvas.removeEventListener;
  }

  addDirectListener(eventType, dimensions, func, name = "") {
    if (!["string", "number"].includes(typeof name)) {
      throw new TypeError("Names must be strings or numbers.");
    }

    let privateListener = "";
    if (arguments[4]) {
      privateListener = "Private";
    }

    if (this._doNotTouch["events" + privateListener].includes(eventType)) {
      this._doNotTouch["eventFunctions" + privateListener].push({
        dimensions: { ...dimensions },
        func,
        name,
        eventType,
      });
    } else {
      this._doNotTouch["events" + privateListener].push(eventType);

      this._doNotTouch["eventFunctions" + privateListener].push({
        dimensions: { ...dimensions },
        func,
        name,
        eventType,
      });

      this.canvas.addEventListener(eventType, event => {
        if (event.offsetX === undefined) {
          throw new RangeError(`Event type "${event.type}" not supported.`);
        }

        this._doNotTouch["eventFunctions" + privateListener].forEach(object => {
          if (object.eventType !== eventType) {
            return;
          }

          const dimensions = object.dimensions;

          if (
            event.offsetX > dimensions.x
            && event.offsetX <
            dimensions.x + dimensions.width

            && event.offsetY > dimensions.y
            && event.offsetY <
            dimensions.y + dimensions.height
          ) {
            object.func(event);
          }
        });
      });
    }
  }

  removeDirectListener(name) {
    if (!["string", "number"].includes(typeof name)) {
      throw new TypeError("Names must be strings or numbers.");
    }

    let privateListener = "";
    if (arguments[1]) {
      privateListener = "Private";
    }

    let removed = false;

    this._doNotTouch["eventFunctions" + privateListener].forEach((object, index) =>
      object.name === name
      && (removed = true)
      && this._doNotTouch["eventFunctions" + privateListener].splice(index, 1)
    );

    return removed;
  }

  isInputActive(inputType) {
    return Boolean(this._doNotTouch.activeInputs[inputType]);
  }


  BoxDimensions = class {
    constructor(positionX, positionY, width, height) {
      this.x = positionX;
      this.y = positionY;
      this.width = width;
      this.height = height;
    }
  }

  BoxElement = class extends Element {
    constructor(dimensions) {
      if (
        typeof dimensions !== "object"
        || typeof dimensions.x !== "number"
        || typeof dimensions.y !== "number"
        || typeof dimensions.width !== "number"
        || typeof dimensions.height !== "number"
      ) {
        throw new TypeError("Dimensions argument is not an object or does not contain required proprerties.");
      }

      super(dimensions);
    }
  }
}