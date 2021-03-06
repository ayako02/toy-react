import { createElement, Component, render } from "./toy-react";

class MyComponent extends Component {
  render() {
    return (
      <div>
        <h1>My Component</h1>
        {this.children}
      </div>
    );
  }
}

render(
  <MyComponent id='a' class='c'>
    <div>Child Component</div>
  </MyComponent>,
  document.body
);
