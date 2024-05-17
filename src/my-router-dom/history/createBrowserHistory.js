/*
location:
  包含浏览器当前的URL信息。
  {
    pathname: '',
    search: '',
    hash: '',
    state: null
  }

match：
  用于保存Route组件与URL的匹配信息。
  {
    isExact: false,
    params: {},
    url: '',
    // 路由要匹配的路径，它可以是一个能够被path-to-reg转换的正则表达式。
    path: ''  
  }
*/

import BlockManager from "./BlockManager"
import ListenManager from "./ListenManager"

const globalLcation = window.location
const globalHistory = window.history  

/**
 * 该函数会返回一个 pathname?search#hash 的路径。
 * @param {string|object} url 当url是string时，是/users、/news这样的路径；如果是object，只处理pathname、search、hash3个属性。
 * @param {*} basename 根路径
 * @returns 
 */
function getPath(url, basename) {
  let path = ''
  if (typeof url === 'string') {
    path = url
  } else if (url !== null && typeof url === 'object') {
    let {
      pathname,
      search = '',
      hash = ''
    } = url

    if (search) {
      search = search.charAt(0) !== '?' ? '?' + search : search
      pathname += search
    }
    if (hash) {
      hash = hash.charAt(0) !== '#' ? '#' + hash : hash
      pathname += hash
    }
    path = pathname
  } else {
    throw new TypeError('pathname must be a string or a object');
  }
  path = basename + path
  path = path.replace(/(\/\/)/g, '/')
  return path
}

function getState() {
  const historyState = globalHistory.state
  
  let state = undefined
  if (typeof historyState === 'string') {
    state = historyState
  } else if (historyState !== null && typeof historyState === 'object') {
    if ('key' in historyState) {
      state = historyState.state
    } else {
      state = historyState
    }
  }
  // console.log('getState: %o, historyState: %o', state, historyState)
  return state
}

// 将一个URL地址解析成由pathname, search, hash属性组成的对象。
export function parsePath(path) {
  const pathname = path.replace(/[?|#].*/, '')

  const matchResult = path.match(/[?|#].*/)

  let hash = ''
  let search = ''
  if (matchResult) {
    const paramStr = matchResult[0]
    if (paramStr.charAt(0) === '#') {
      hash = paramStr
    } else {
      const index = paramStr.indexOf('#')
      if (-1 !== index) {
        search = paramStr.substring(0, index)
        hash = paramStr.substring(index, paramStr.length)
      } else {
        search = paramStr
      }
    }
  }
  search = search.length === 1 ? '': search;
  hash = hash.length === 1 ? '': hash
  return { pathname, search, hash }
}

function createLocation(basename) {
  let pathname = globalLcation.pathname

  if (pathname === basename) {
    pathname = '/'
  } else if (basename !== '/'){
    // basename不是默认值才进行替换。
    pathname = pathname.replace(basename, '')
  }

  return {
    pathname,
    hash: globalLcation.hash,
    search: globalLcation.search,
    state: getState()
  }
}

function createLocationFromPath(path, state) {
  const pathInfo = parsePath(path)
  return {
    ...pathInfo,
    state
  }
}

function createKey(length) {
  return Math.random().toString().substring(2, length)
}

function addChangingRouteListen(handler) {
  /*
    Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
    The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.
    When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.

    popstate事件只能够监听浏览器的地址前进、后退和用户改变URL hash值的事件变化。
    history的push和replace方法是监听不到的。
  */
  window.addEventListener('popstate', (w, ev) => {
    // console.log(w, ev)
    handler()
  })
}

export default function createBrowserHistory(options = {}) {
  const {
    basename = '/',
    forceUpdate = false,
    keyLength = 6,
    getUserConfirmation = (
      message, next
    ) => {
      next(window.confirm(message))
    }
  } = options

  const listenManager = new ListenManager()
  const blockManager = new BlockManager(getUserConfirmation)

  function go(n) {
    window.history.go(n)
  }

  // pathname支持string或object
  function push(pathname, state = undefined) {
    const action = 'PUSH'
    const path = getPath(pathname, basename)

    const location = createLocationFromPath(path, state)
    
    const next = () => {
      globalHistory.pushState({
        key: createKey(keyLength),
        state
      }, null, path)
  
      // 执行监听
      listenManager.trigger(location, action)
  
      history.acton = action
      history.location = location
  
      if (forceUpdate) {
        globalLcation.href = path
      }
    }

    blockManager.trigger(location, action, next)
  }

  function replace(pathname, state = undefined) {
    const action = 'REPLACE'
    const path = getPath(pathname, basename)

    const location = createLocationFromPath(path, state)
    
    const next = () => {
      globalHistory.replaceState({
        key: createKey(keyLength),
        state
      }, null, path)
  
      // 执行监听
      listenManager.trigger(location, action)
  
      history.acton = action
      history.location = location
  
      if (forceUpdate) {
        globalLcation.href = path
      }
    }

    blockManager.trigger(location, action, next)
  }

  function listen(callback) {
    return listenManager.listen(callback)
  }

  function block(message) {
    return blockManager.block(message)
  }

  function createHref(location) {
    const { pathname = '', hash = '', search = '' } = location
    let href = pathname
    if (search) {
      href += '?' + search
    }
    if (hash) {
      href += '#' + hash
    }
    return href
  }

  const POP = 'POP'

  const history = {
    acton: POP,
    location: createLocation(basename),
    push,
    replace,
    go,
    listen,
    block,
    createHref
  }

  // 当URL变化时，需要加入一个触发阻塞的处理。
  addChangingRouteListen(() => {
    const location = createLocation(basename);

    blockManager.trigger(location, POP, () => {
      listenManager.trigger(location, POP)
      history.acton = POP
      history.location = location
    })
  })

  return history
}