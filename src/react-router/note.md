
### Router
该组件不做任何展示，仅提供路由器模式。
该组件会产生一个上下文，上下文中会提供一些实用的对象和方法，供其他组件使用。

Context对于开发者是隐藏的，当Route组件匹配到路径时，才会将Context作为属性传入对应的组件的。

- HashtRouter: 使用hash模式匹配
- BrowerRouter: 使用history模式匹配

**history**
history是Context注入的一个prop。利用该对象来实现无刷新跳转地址。

- push
  用于将某个新的地址入栈。
- replace
- go
- forward

**location**
location是history的一个属性，但是React为了使用方便，将其注入到props中。
即：props.history.location === props.location

location和window.location是不同的对象，props的location对象记录了当前地址的相关信息。比如path、hash、search（查询字符串）等。
通常会配合第三方库query-string来解析location的数据。

**match**
match对象保存了路由匹配信息。

- isExact
  表示路由是否精确匹配当前path，它与Route组件的exact prop无关。

如何在路由跳转之间传递数据?
- push()方法的state参数。
- 通过URL的hash参数
- 通过URL的search参数
  news?year=2012&month=8&day=6
- params
  news/2019/8/6

Route组件的path prop支持string pattern模式，通过string pattern实现来实现params传递。


**withRouter**
withRouter是React提供的高阶组件，它可以对传入的组件注入路由上下文信息。


### Route
根据不同的paht，渲染不同的组件。

- path: 匹配的路径
- component: path对应的要展示的组件
- exact: 表示path是精确匹配模式。

- children
  当Route组件自己进行匹配渲染时（比如不配合Switch组件使用），会有俩种情况：
  如果传递React Element，无法是否匹配，都会渲染children，并忽略component prop。
  如果传递的是函数，且该函数返回的是React Element，渲染逻辑同上相同。

Route组件可以内嵌Context包含的任何地方。

### Switch
获取所有的Route组件，遍历Route组件列表，若Route组件的path与URL的path相匹配，就渲染出来，并终止循环。
即Switch只会渲染匹配到的第一个Route。


### Link
生成一个不需要刷新跳转的a元素。

- to
  要跳转的路径。to也可以是一个对象，对象属性有：
  {
    pathname: '', // URL路径
    search: '',
    hash: '',   // 
    state: ''   // 附加信息
  }
- replace
  bool，是否替换当前URL。
- innerRef
  可以将内部a元素的ref对象赋值在传递进来的props上面，它的值可以是ref对象或者函数。


### NavLink
当URL的path和组件prop上的path相同时，该组件会为a元素增加一个active样式。

- activeClassName: 样式的名字。
- activeStyle: 匹配时使用的行内样式。

### Redirect
重定向组件。当加载到该组件时，会自动跳转（无刷新）到另外一个地址。

- to
  to可以是字符串或者对象，与Link组件的to一致。
- push
  表示是否使用push()方法来进行重定向，默认false。
- from
  当from与URL的path匹配时，Redirect组件才生效。