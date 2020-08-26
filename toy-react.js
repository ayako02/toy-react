class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(component) {
    this.root.appendChild(component.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

class Component {
  constructor() {
    this.props = Object.create(null);
    this.children = [];
    this._root = null;
  }
  setAttribute(name, value) {
    this.props[name] = value;
  }
  appendChild(component) {
    this.children.push(component);
  }
  get root() {
    if (!this._root) {
      this._root = this.render().root;
    }
    return this._root;
  }
}

const createElement = (type, attributes, ...children) => {
  let object;

  if (typeof type === "string") {
    object = new ElementWrapper(type);
  } else {
    object = new type();
  }

  for (let attribute in attributes) {
    object.setAttribute(attribute, attributes[attribute]);
  }

  const insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new TextWrapper(child);
      }
      if (typeof child === "object" && child instanceof Array) {
        insertChildren(child);
      } else {
        object.appendChild(child);
      }
    }
  };

  insertChildren(children);

  return object;
};

const render = (component, parentElement) => {
  parentElement.appendChild(component.root);
};

export { Component, createElement, render };
