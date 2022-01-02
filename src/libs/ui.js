class UIElement {
  constructor(dom) {
    this.dom = dom;
  }

  add() {
    for (let i = 0, l = arguments.length; i < l; i++) {
      const argument = arguments[i];
      if (argument instanceof UIElement) {
        this.dom.appendChild(argument.dom);
      } else {
        console.log("UIElement:", argument, "is not an instance of UIElement.");
      }
    }
  }
  remove() {
    for (let i = 0, l = arguments.length; i < l; i++) {
      const argument = arguments[i];
      if (argument instanceof UIElement) {
        this.dom.removeChild(argument.dom);
      } else {
        console.log("UIElement:", argument, "is not an instance of UIElement.");
      }
    }
  }
  clear() {
    while (this.dom.children.length) {
      this.dom.removeChild(this.dom.lastChild);
    }
  }
  setId(id) {
    this.dom.id = id;
    return this;
  }
  getId() {
    return this.dom.id;
  }
  setClass(name) {
    this.dom.classname = name;
    return this;
  }
  addClass(name) {
    this.dom.classList.add(name);
    return this;
  }
  removeClass(name) {
    this.dom.classList.remove(name);
    return this;
  }
  setStyle(style, array) {
    for (let i = 0, l = array.length; i < l; i++) {
      this.dom.style[style] = array[i];
    }
    return this;
  }
  setDisabled(value) {
    this.dom.disabled = value;
    return this;
  }
  setTextContent(value) {
    this.dom.textContent = value;
    return this;
  }
  setInnerHTML(value) {
    this.dom.innerHTML = value;
    return this;
  }
  getiIndexOfChild(element) {
    return Array.prototype.indexOf.call(this.dom.children, element.dom);
  }
}

const properties = [
  "position",
  "let",
  "right",
  "top",
  "bottom",
  "width",
  "height",
  "border",
  "borderLeft",
  "borderRight",
  "borderTop",
  "borderBottom",
  "borderColor",
  "display",
  "overflow",
  "margin",
  "marginLeft",
  "marginRight",
  "marginTop",
  "marginBottom",
  "padding",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "paddingBottom",
  "background",
  "backgroundColor",
  "opacity",
  "fontSize",
  "fontWeight",
  "textAlign",
  "textDecoration",
  "textTransform",
  "cursor",
  "zIndex"
];

properties.forEach((property) => {
  const method =
    "set" +
    property.substr(0, 1).toUpperCase() +
    property.substr(1, property.length);

  UIElement.prototype[method] = function () {
    this.setStyle(property, arguments);
  };
});

const events = [
  "KeyUp",
  "KeyDown",
  "MouseOver",
  "MouseOut",
  "Click",
  "DblClick",
  "Change",
  "Input"
];

events.forEach((event) => {
  const method = "on" + event;
  UIElement.prototype[method] = function (callback) {
    this.dom.addEventListener(event.toLowerCase(), callback.bind(this), false);
    return this;
  };
});

class UISpan extends UIElement {
  constructor() {
    super(document.createElement("span"));
  }
}

class UIDiv extends UIElement {
  constructor() {
    super(document.createElement("div"));
  }
}

class UIRow extends UIDiv {
  constructor() {
    super();
    this.setClass("Row");
  }
}

class UIPanel extends UIDiv {
  constructor() {
    super();
    this.setClass("Panel");
  }
}

class UIText extends UISpan {
  constructor(text) {
    super();

    this.setClass("Text");
    this.setCursor("default");
    this.setDisplay("inline-block");

    this.setValue(text);
  }

  getValue() {
    return this.dom.textContent;
  }

  setValue(value) {
    if (value) {
      this.setTextContent(value);
    }
    return this;
  }
}

class UIInput extends UIElement {
  constructor(text) {
    super(document.createElement("input"));

    this.setClass("Input");
    this.setPadding("2px");
    this.setBorder("1px solid transparent");

    this.dom.setAttribute("autocomplete", "off");

    this.onKeyDown((event) => {
      event.stopPropagation();
    });

    this.setValue(text);
  }

  getValue() {
    return this.dom.value;
  }

  setValue(value) {
    this.dom.value = value;
    return this;
  }
}

export { UIElement, UISpan, UIDiv, UIPanel, UIRow, UIText, UIInput };
