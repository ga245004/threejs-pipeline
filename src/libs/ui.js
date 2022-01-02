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
    this.dom.className = name;
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
  "left",
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
  "verticalAlign",
  "color",
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
    return this;
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

class UISelect extends UIElement {
  constructor() {
    super(document.createElement("select"));
    this.setClass("Select");
    this.setPadding("2px");

    this.dom.setAttribute("autocomplete", "off");
  }

  setMultiple(boolean) {
    this.dom.multiple = boolean;
    return this;
  }

  setOptions(options) {
    const selected = this.dom.value;
    this.clear();

    for (const key in options) {
      const option = document.createElement("option");
      option.value = key;
      option.innerHTML = options[key];
      this.dom.appendChild(option);
    }
    this.dom.value = selected;
    return this;
  }

  getValue() {
    return this.dom.value;
  }

  setValue(value) {
    value = String(value);
    if (this.dom.value !== value) {
      this.dom.value = value;
    }
    return this;
  }
}

class UICheckbox extends UIElement {
  constructor(boolean) {
    super(document.createElement("input"));
    this.setClass("Checkbox");
    this.dom.type = "checkbox";

    this.setValue(boolean);
  }

  getValue() {
    return this.dom.checked;
  }

  setValue(value) {
    if (value !== undefined) {
      this.dom.checked = value;
    }
    return this;
  }
}

class UIBoolean extends UISpan {
  constructor(boolean, text) {
    super();
    this.setMarginRight("4px");

    this.checkbox = new UICheckbox(boolean);
    this.text = new UIText(text).setMarginLeft("3px");

    this.add(this.checkbox);
    this.add(this.text);
  }

  getValue() {
    return this.checkbox.getValue();
  }

  setValue(value) {
    this.checkbox.setValue(value);
  }
}

class UITabbedPanel extends UIDiv {
  constructor() {
    super();
    this.setClass("TabbedPanel");

    this.tabs = [];
    this.panels = [];

    this.tabDivs = new UIDiv();
    this.tabDivs.setClass("Tabs");

    this.panelDivs = new UIDiv();
    this.panelDivs.setClass("Panels");

    this.add(this.tabDivs);
    this.add(this.panelDivs);

    this.selected = "";
  }

  select(id) {
    let tab;
    let panel;

    if (this.selected && this.selected.length) {
      tab = this.tabs.find((item) => {
        return item.dom.id === this.selected;
      });

      panel = this.panels.find((item) => {
        return item.dom.id === this.selected;
      });

      if (tab) {
        tab.removeClass("selected");
      }

      if (panel) {
        panel.setDisplay("none");
      }
    }

    tab = this.tabs.find((item) => {
      return item.dom.id === id;
    });

    panel = this.panels.find((item) => {
      return item.dom.id === id;
    });

    if (tab) {
      tab.addClass("selected");
    }

    if (panel) {
      panel.setDisplay("");
    }

    this.selected = id;
    return this;
  }

  addTab(id, label, items) {
    const tab = new UITab(label, this);
    tab.setId(id);
    this.tabs.push(tab);
    this.tabDivs.add(tab);

    const panel = new UIDiv();
    panel.setId(id);
    panel.add(items);
    panel.setDisplay("none");
    this.panels.push(panel);
    this.panelDivs.add(panel);

    this.select(id);
  }
}

class UITab extends UIText {
  constructor(text, parent) {
    super(text);
    this.setClass("Tab");
    this.parent = parent;
    this.onClick(() => {
      this.parent.select(this.dom.id);
    });
  }
}

class UIBreak extends UIElement {
  constructor() {
    super(document.createElement("br"));
    this.setClass("Break");
  }
}

export {
  UIElement,
  UISpan,
  UIDiv,
  UIPanel,
  UIRow,
  UIText,
  UIInput,
  UISelect,
  UICheckbox,
  UIBoolean,
  UITabbedPanel,
  UITab,
  UIBreak
};
