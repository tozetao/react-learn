import React, { Component } from 'react';
import ErrorBound from '.';

// import ErrorBound from "./index";

function ClassA() {
  return <div>
    <h3>Class A</h3>
    <ClassB />
  </div>
}

function ClassB() {
  let list = undefined
  list = list.map(item => {
    return <span>{item * 2}</span>
  })
  return <div>
    <h3>Class B</h3>
    { list }
  </div>
}

function ClassFoo() {
  return <div>
    <h3>Class Foo</h3>
  </div>
}

export default class Test extends Component {
  render() {
    return (
      <div>
        <ErrorBound>
          <ClassA />
        </ErrorBound>
        <ClassFoo />
      </div>
    )
  }
}
