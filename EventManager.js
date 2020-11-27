const supportedEvents = ["click", "mousemove"];

class Element {
  #_doNotTouch = {
    symbol: Symbol(),
    listeners: [],
  };

  constructor(dimensions) {
    if (typeof dimensions !== "object") {
      throw new TypeError("Element dimensions must be an object.");
    }

    this.dimensions = { ...dimensions };
  }

  addEventListener(event) {
    if (typeof event !== "string") {
      throw new TypeError("Event type must be a string.");
    }
  }

  remove() {
    //
  }
};


export default class EventManager {
  #_doNotTouch = {
    events: [],
    eventFunctions: [],

    eventsPrivate: [],
    eventFunctionsPrivate: [],

    elementIDIndex: 0,
  };

  #activeInputs = {};

  canvasElements = [];

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

    this.canvas = canvas;

    canvas.tabIndex = 0;

    canvas.addEventListener("contextmenu", event =>
      this.rightClickDisabled && event.preventDefault()
    );

    canvas.addEventListener("mousemove", event => {
      this.mousePositionX = event.offsetX;
      this.mousePositionY = event.offsetY;
    });

    canvas.addEventListener("keydown", event =>
      this.#activeInputs[event.code] = true
    );
    canvas.addEventListener("keyup", event =>
      this.#activeInputs[event.code] = false
    );

    canvas.addEventListener("mousedown", event =>
      this.#activeInputs[["LeftMouse", "RightMouse"][event.button / 2]] = true
    );

    canvas.addEventListener("mouseup", event =>
      this.#activeInputs["LeftMouse"] = this.#activeInputs["RightMouse"] = false
    );
  }

  addDirectListener(eventType, dimensions, func, name = "") {
    if (!["string", "number"].includes(typeof name)) {
      throw new TypeError("Names must be strings or numbers.");
    }

    let privateListener = "";
    if (arguments[4]) {
      privateListener = "Private";
    }

    if (this.#_doNotTouch["events" + privateListener].includes(eventType)) {
      this.#_doNotTouch["eventFunctions" + privateListener].push({
        dimensions: { ...dimensions },
        func,
        name,
        eventType,
      });
    } else {
      this.#_doNotTouch["events" + privateListener].push(eventType);

      this.#_doNotTouch["eventFunctions" + privateListener].push({
        dimensions: { ...dimensions },
        func,
        name,
        eventType,
      });

      this.canvas.addEventListener(eventType, e => {
        if (e.offsetX === undefined) {
          throw new RangeError(`Event type "${e.type}" not supported.`);
        }

        this.#_doNotTouch["eventFunctions" + privateListener].forEach(object => {
          if (object.eventType !== eventType) {
            return;
          }

          const dimensions = object.dimensions;

          if (
            e.offsetX - this.offsetX > dimensions.x
            && e.offsetX - this.offsetX <
            dimensions.x + dimensions.width

            && e.offsetY - this.offsetY > dimensions.y
            && e.offsetY - this.offsetY <
            dimensions.y + dimensions.height
          ) {
            object.func(e);
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

    this.#_doNotTouch["eventFunctions" + privateListener].forEach((object, index) =>
      object.name === name
      && (removed = true)
      && this.#_doNotTouch["eventFunctions" + privateListener].splice(index, 1)
    );

    return removed;
  }

  isInputActive(inputType) {
    return Boolean(this.#activeInputs[inputType]);
  }


  BoxDimensions = class {
    constructor(positionX, positionY, width, height) {
      this.x = positionX;
      this.y = positionY;
      this.width = width;
      this.height = height;
    }
  }

  ButtonElement = class extends Element {
    constructor(dimensions = { x: null, y: null, width: null, height: null }) {
      super(dimensions);
    }
  }

  InputElement = class extends Element {
    constructor(dimensions, functions) {
      if (typeof dimensions !== "object") {
        throw new TypeError("Element dimensions must be an object.");
      }
    }
  }

  CheckboxElement = class extends Element {
    constructor(dimensions, functions) {
      if (typeof dimensions !== "object") {
        throw new TypeError("Element dimensions must be an object.");
      }
    }
  }

  FileInputElement = class extends Element {
    constructor(dimensions, functions) {
      if (typeof dimensions !== "object") {
        throw new TypeError("Element dimensions must be an object.");
      }
    }
  }

  NumberInputElement = class extends Element {
    constructor(dimensions, functions) {
      if (typeof dimensions !== "object") {
        throw new TypeError("Element dimensions must be an object.");
      }
    }
  }
}