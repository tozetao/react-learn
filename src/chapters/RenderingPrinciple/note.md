### 渲染原理

**React渲染**

生成用于渲染UI界面的对象，以及将这些对象转换成真实的DOM对象。



**React Element**

React Element是一个由React.createElement()创建的对象。
比如编写的JSX代码，或者使用的组件，这些都是语法糖，其实都是由React.createElement()创建的对象。



**React Component（React节点）**

专门用于渲染到UI界面的对象，React节点是通过React Element创建的。

  React节点分为以下类型：
  - React DOM节点：创建该节点的React元素是一个字符串
  - React 组件节点：创建该节点的React元素是一个class或者函数
  - React 空节点：通过false、undefined、null、true创建的节点
  - React 数组节点：通过数组创建的节点
  - React 文本节点：通过字符串或数字创建的节点

```html
<div>
  <div>
    <h3>Title</h3>
    {["foo", false, null, <span>Test</span>]}
  </div>
  <p>{undefined}</p>
</div>
```



### 新节点挂载

新节点挂载大体可以分为4个阶段：

阶段1：React会根据参数创建React节点。

阶段2：根据不同类型的React节点，会有不同的处理。

1. 对于文本节点，会通过document.createTextNode()创建真实的文本节点。

2. 对于空节点，不做任何事情。

3. 对于数组节点，会遍历整个数组，针对数组中每项元素递归的进行渲染处理（即从步骤1开始进行处理）

4. 对于DOM节点，会通过document.createElement()创建真实DOM元素，并根据React元素的props设置真实DOM元素属性，接着遍历React元素props属性的children数组，递归渲染children数组中的每一项（即从步骤1开始进行处理）。

5. 对于函数组件节点，会调用该函数，根据该函数返回的React元素类型进行递归渲染处理（即返回到步骤1进行处理，直到递归结束）

6. 对于类组件节点，会做以下处理：

     - 实例化该类的对象

     - 调用getDerivedStateFromProps()函数

     - 调用render()方法，在这里会对render()返回的React元素进行递归处理，直到递归结束。

     - 将componentDidMount方法加入到执行队列（先进先出），并不执行。

阶段2完成后就构成了一颗虚拟的DOM树。

阶段3：保存该虚拟DOM树

阶段4：将之前生成的真实DOM，挂载到根节点中



**componentDidMount()的执行时机**
只有当整个虚拟DOM树构建完毕，将真实DOM挂载到跟节点中时，才会去执行该执行队列中的内容。在该生命周期函数内，真实DOM树已经渲染完毕。

**componentDidMount()的执行顺序**
我们是递归的构建整颗虚拟DOM树的，因此叶子节点的生命周期函数会最先进入到执行队列中，因此生命周期函数的执行顺序是从树的最底部叶子节点顺着根部节点一次执行。



### 节点的更新
节点会在以下俩种场景进行更新。

场景1：调用ReactDOM.render()函数，React会对根节点进行diff对比更新。

场景2：在组件内调用setState()方法，将会进行以下节点更新处理。
1. 调用生命周期函数getDerivedStateFromProps()
2. 调用shouldComponentUpdate，返回false将中止执行更新流程。返回true将继续以下的处理。
3. 调用render()方法，得到一个新的节点，对该新节点进行diff对比更新。
4. 把生命周期函数getSnapshotBeforeUpdate加入执行队列
5. 把生命周期函数componentDidUpdate加入执行队列

  α：执行完以上步骤后，将会继续进行下面的处理：
    1. 完成真实DOM更新
    2. 执行队列中的componentDidMount
    3. 执行队列中的getSnapshotBeforeUpdate
    4. 执行队列中的componentDidUpdate



### diff对比

diff对比指的是将产生的新节点与之前虚拟DOM树中对应的旧节点进行对比，找出差异并进行更新。

> 注：如何找到新节点在虚拟DOM树中对应的旧节点?
> 为了提高查找效率，React做了以下假设：
>
> - 节点在虚拟DOM树中的层级不会移动。
>
>   当前节点在调用render()方法产生新节点时，根据当前节点的层级就可以知道新节点的层级，通过树的层级就可以直接在旧虚拟DOM中找到对应的旧节点。
>
>   个人理解：根据新节点所在层级
>
> - 不同的节点类型会产生不同的结构。
>   节点类型相同指除了节点类型，对于React元素生成的节点，React元素的type也必须相同。
>
> - 多个兄弟节点可以通过key来确定对比的新节点
>
>   如果新节点有key值，就不是通过层级关系去找到旧节点，而是对比旧节点树中同一层级下的所有节点的key，key相同意味着节点相同，否则就是找不到节点。
>
> diff算法的实现？
>
> 个人猜想：遍历新节点树，每遍历一个节点都会去旧节点树中寻找对其对应的旧节点，寻找过程猜测是先根据新节点的层级，找到在旧节点树中的对应层级，再根据新节点在其父节点的索引位置去定位旧节点树同一层级的旧节点。
>
> ```js
> class Node {
>     children = []
>     index = 0
> }\
> ```



**可以找到旧节点**

首先找到新节点所在虚拟DOM树中所对应的旧节点，并判断俩者的节点类型是否一致。这里的节点类型一致除了节点的类型，如果是React元素创建的节点，type也必须一致。

如果类型一致会有以下处理方式：
  1. 对于空节点，不做任何处理

  2. 对于文本节点

     重用之前的真实DOM对象，并记录文本节点的变化（比如改变文本内容）

  3. 对于DOM节点

     重用之前的DOM对象，并记录DOM节点的变化（如果有的话，比如改变真实DOM的属性）。接着遍历子节点，递归的进行diff对比更新。

  4. 对于函数组件节点

     会直接调用该函数组件，得到一个新的节点对象，进入递归对比更新

  5. 对于类组件节点

     重用之前的类实例对象。
     调用生命周期函数getDerivedStateFromProps()
     调用shouldComponentUpdate，返回false将中止更新流程，返回true继续执行以下处理。
     调用render()方法，得到一个新的节点，对该新节点进行diff对比更新。
     把生命周期函数getSnapshotBeforeUpdate加入执行队列
     把生命周期函数componentDidUpdate加入执行队列

  6. 对于数组节点

     遍历数组中的每一项，并递归diff对比更新。

  如果类型不一致：
       1. 根据新节点创建新的虚拟DOM树（子树），进入新节点的挂载流程。
       2. 如果旧节点是空节点、DOM节点、数组节点、文本节点，会卸载旧节点；如果旧节点是组件节点，会卸载该组件节点，并调用componentWillUnMount函数，接着递归卸载组件节点的子节点。

  注：无论类型是否一致，整个节点树的diff对比更新完成后，都会去执行上文α标记下的步骤。









**找不到旧节点**

新的虚拟DOM树中新增了节点，或者删除了节点，这时就会发生找不到对应的旧节点的情况。

```react
const old = <div>
	<h3>Title</h3>
	<button>Click</button>
</div>
// 虚拟DOM树中新增了节点
const newNode = <div>
          <h3>Title</h3>
          <button>Click</button>
          <span>New node</span>
      </div>
// 虚拟DOM树中删除了节点
const deletedNode = <div>
	<h3>Title</h3>
</div>
```

找不到旧节点时，React会进行以下操作：

1. 如果存在新的节点，那么创建新的节点并挂载。
2. 如果存在旧的节点，那么卸载旧节点。



**key的作用**

用于在diff更新时，比较俩个节点是否相同。也就是说通过key来寻找新旧节点。

好处：旧节点和新节点相同，意味着不会创建新的节点对象，对于类组件节点，可以重用组件对象；对于DOM节点，可以重用真实dom对象。

example：通过给元素设置key，避免不必要的真实DOM操作。

```react
class Demo {
	state = {
        numbers: [1,2]
    }
    render() {
        // 如果元素没有key，向数组第一项插入数据后，所有li元素的文本节点都需要更改。
        // 当元素有key时，会新增新的LI节点，但是旧的节点类型相同，且文本节点不需要进行更新，减少了不必要的真实DOM操作。
        const lis = this.state.numbers.map(item => {<li>{item}</li>})
        return (
            <ul>
                {lis}
            </ul>
            <button onClick={() => {
                    this.setState({
                        numbers: [Math.random() * 100, ...this.state.numbers]
                    })
                }}>Click</button>
        )
    }
}
```







