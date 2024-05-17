import React from 'react';
import ReactDOM from 'react-dom';

// import App from './my-redux/test';
// ReactDOM.render(<App />, document.getElementById('root'));

// import App from './redux-saga/demo';
// ReactDOM.render(<App />, document.getElementById('root'));

// import App from './my-redux-saga/demo';
// ReactDOM.render(<App />, document.getElementById('root'));

// import App from './my-react-redux/demo';
// ReactDOM.render(<App />, document.getElementById('root'));

// import App from './redux-actions/demo';
// ReactDOM.render(<App />, document.getElementById('root'));

// import App from './my-router-dom/test';
// ReactDOM.render(<App />, document.getElementById('root'));

import App from './admin/app';
ReactDOM.render(<App />, document.getElementById('root'));

// import App from './router/guard/Guard';
// ReactDOM.render(<App />, document.getElementById('root'));

// // React事件
// import Test from './components/Event/Test'
// ReactDOM.render(<Test />, document.getElementById('root'));

// document.querySelector('#container').onclick = function(e) {
//   console.log('容器事件处理', e.target)
//   // 阻止事件冒泡会导致React事件不执行
//   e.stopPropagation()
// }

// document.querySelectror('#container').addEventListener('click', function(e) {
//   // 阻止为当前事件类型所绑定的后续事件处理，下面绑定的click事件不会执行。
//   e.stopImmediatePropagation()
//   console.log(1)
// })
// document.querySelector('#container').addEventListener('click', function() {
//   console.log(2)
// })