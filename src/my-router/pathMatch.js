import { pathToRegexp } from 'path-to-regexp'

function getOptions(options) {
  const defaultOptions = {
    exact: false,
    // 以 / 结尾的path是否匹配  
    strict: false,
    // 严格区分大小写
    sensitive: false
  }

  const opts = {...defaultOptions, ...options}

  return {
    sensitive: opts.sensitive,
    strict: opts.strict,
    end: opts.exact
  }
}

// 要实现的效果
// path: 匹配的路由
// url: 被匹配的地址
// options: 选项。

export function pathMatch(path, url, options) {
  const newOptions = getOptions(options)

  let keys = []
  const reg = pathToRegexp(path, keys, newOptions)
  let match = reg.exec(url)

  if (!match) {
    return null
  }

  const matchUrl = match[0]
  
  match = match.slice(1)
  const params = {}
  keys.forEach((item, index) => {
    params[item.name] = match[index]
  });

  return {
    params,
    url: matchUrl,
    path,
    isExact: url === matchUrl
  }
}


/*
// /^\/user(?:\/([^\/#\?]+?))[\/#\?]?$/i
// /^\/user(?:\/([^\/#\?]+?))\/issus(?:\/([^\/#\?]+?))[\/#\?]?$/i

(?:...)
  这是一个非捕获分组，虽然它是一个分组，但是不会捕获匹配的文本，不能被反引用。

  捕获分组的示例：



?=
  正向前瞻断言。在正则表达式中用于满足某种匹配条件，但是不包含匹配结果的一种模式。

   /hello(?= world)/
   该表达式可以匹配hello world，但是匹配结果是不会包含 world字符。

?!
  负向前瞻断言。匹配不以特定字符结束的字符串。
  
  /\d+(?!\.)/
  比如该表达式，将会匹配到不以小数点结尾的数字。


问题：
- 非捕获分组的应用?
- 贪婪模式和非贪婪模式的区别?

- ?=，有什么作用
  /^\/news(?:[\/#\?](?=[]|$))?(?=[\/#\?]|[]|$)/i
  表示不消耗字符，后面的表达式就应该是结尾了。
  (?:\/(?=$))?
  表示以/结尾，也可以没有 /



*/