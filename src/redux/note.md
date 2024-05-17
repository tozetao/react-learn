### action
action是一个普通的对象，描述了要做的事情。


- action是一个plain-object。它的\_\_proto__指向object.\_\_proto\_\_。
- action必须包含type属性。



action约定的格式:

```
{
    type: '',		// 操作类型
    payload: any	// 附加数据
}
```



良好的实践：

1. action type

   为了避免硬编码（hard code），会将action的类型放置在同个文件中，这有助于集中管理action。

2. action creator

   action creator是一个纯函数，只是用于创建action对象。

   纯函数就是一个简单的输入输出函数，有以下要求：

   - 不可以对外部造成影响，比如使用本地存储（localStorage）的API。
   - 不可以有异步操作。
   - 不可以改变外部变量。
   - 不可以改变函数自身的参数。





### store
store是数据仓库，用于存储共享数据。通过向仓库分发（dispatch）action，可以修改仓库中的数据。



- dispatch：分发一个action
- getState：获取当前的仓库状态
- replaceReducer：替换掉当前的Reducer。
- subscribe：注册一个监听器。



```js
function subscribe(callback): cancelFunc;
/*

当Store分发（dispatch）之后，就会运行该监听器。
在callback中，我们可以获取分发处理完成后的数据。在react中，我们可以用于更新组件状态变化。

cancelFunc用于取消监听。
*/
```






### reducer
reducer是处理器。简单的说，它会根据action类型的不同来处理数据，并向仓库返回处理过的新数据。最后由仓库重新保存。



执行时机：

- 当创建数据仓库（store）时，会触发一次reducer的执行。
- 主动调用，比如调用store.dispatch去分发action。



```
const store = createStore(reducer);

// 由于在第一次创建仓库时会执行一次reducer，因此可以把初始值的部分放置到reducer参数中。
function reducer(state = {
	cnt: 1000,
	options: {...}
}, action)
```





良好实践：

1. 一般遵循一个数据仓库（store）对应一个reducer，并且一个工程中只有一个数据仓库。
2. 为了方便管理，通常会将reducer的代码放置在同个文件中。
3. reducer必须是一个没有副作用的纯函数。副作用包括：1是不允许改变函数参数，比如state参数；2是不能有异步；3是不能对外部造成影响。
4. 在中大型的项目中，由于存储数据的结构复杂，操作繁多，因此需要对reducer按照action的所属分类进行划分，最终在合并成一个reducer。



### Middleware

```
function createStore(state, initial, applyMiddleware)
```

applyMiddleware会为Store应用中间件函数。redux规定了中间件函数：

- 中间件函数接收一个store参数，该store只包含dispatch、getState方法，并不是原生Store对象。
- 必须返回一个创建dispatch函数的函数。

```js
function logger(store) {
    return function(nextDispatch) {
        // applyMiddleware会将Store的dispatch替换成下面返回的dispatch。
        return function dispatch(action) {
            // ...
        }
    }
}
```



applyMiddleware应用中间件的实现逻辑：

就像栈一样，applyMiddleware会依次从中间件参数列表中弹出元素进行处理：

对于第一个弹出的中间件，它会将Store的dispatch函数传递给该中间件。同时运行该中间件得到一个新的dispatch函数。新的dispatch函数会作为参数传递给下一个弹出的中间件。

以此类推，直到栈中没有元素时，最后所返回的dispatch函数，会赋值给Store的dispatch属性。



本质上利用闭包实现了一个链表：

第一个中间件返回的dispatch函数是一个闭包，它绑定了下一个中间件的dispatch函数，而下一个中间件的dispatch也是一个闭包，它绑定了下下个中间件的dispatch函数。以此类推，最后一个中间件的dispatch绑定的是Store.dispatch函数。



```js
const middlewares = [...]
let currentDispatch = Store.dispatch
let middleware = null
while (middlewre = middlewares.pop()) {
    const createDispatch = middleware(Store)
	currentDispatch = createDispatch(currentDispatch)
}
Store.dispatch = currentDispatch
```



```js

// 中间件要实现的效果：利用闭包实现了链式调用。

// dispatch指向下一个中间件的dispatch
const producer1 = function(dispatch) {
    return function(action) {
        // do something
        dispatch(action)
    }
}

/*
组合函数会返回一个函数，该函数能够实现下面的效果：
fn1(fn2(fn3(...args)))

对上面的执行函数进行变换有：
R1 = fn1(fn2(...args))
R2 = R1(fn3(...args))
R3 = R2(fn4(..args))

利用组合函数就可以实现闭包的链式调用效果。
*/

const middlewares = [...];

```







### redux-thunk

thunk中间件允许Action是一个带有副作用的函数。当Action是一个函数，在分发（dispatch）时thunk会组织action继续向后提交。

当Action是一个函数时，thunk会像函数中传递3个参数：

- dispatch：该dispatch是store.dispatch，而不是中间件的dispatch。
- getState()：来自store.getState()
- extra：在应用中间件的时候，通过thunk.withExtraArgument()进行设置。

```js
// fetchUsers()用于创建一个Action
function fetchUsers() {
    // action
    return function(dispatch, getState, extra) {
        
    }
}

// 分发action
store.dispatch(fetchUsers())
```





thunk也允许Action是一个异步函数，或者该Action返回一个Promise：

```js
function fetchUsers() {
    return async function(dispath, getState, extra) {
        const users await 
    }
}
```





### redux-promise

如果action是一个Promise时，它会将完成的结果作为action触发；

如果action不是一个Promise，会判断payload是否是Promise对象。如果payload是一个Promise，会等待Promise的结果，并将Promise的结果作为payload的值再触发action。

