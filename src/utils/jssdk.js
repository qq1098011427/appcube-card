
// 获取uniqueKey 时间戳存在重复的情况
const getUniqueKey = () => {
  return String(Date.now()) + String(Math.random()).slice(2)
}

class Task {
  constructor (data) {
    this.id = getUniqueKey()
    this.data = data

    return this
  }

  call () {
    const { module, method, data } = this.data
    console.info(`接口：${module}.${method}, 入参：`, data)

    return new Promise((resolve, reject) => {
      window.SHMJSBridge(module, method, this.id, JSON.stringify(data))

      this.resolve = resolve
      this.reject = reject
    })
  }
}

const TASK_MAP = {}
const Event = {
  __handlerMap: {},

  __offHandlerMap: {},

  fire (event, data) {
    if (!this.__handlerMap[event]) {
      console.error(`事件：还未绑定过“${event}”, 请绑定后重新触发`)
      return true
    }

    console.success(`事件：“${event}”被触发, 参数：`, data)

    new Task({
      module: 'system',
      method: 'fireEvent',
      data: {
        detail: data
      }
    }).call()
  },

  dispatch (event, data) {
    if (!this.__handlerMap[event]) {
      console.error(`事件：还未绑定过“${event}”, 请绑定后重新触发`)
      return true
    }

    const customEvent = new window.CustomEvent(event, {
      detail: data
    })

    console.success(`事件：“${event}”被触发, 参数：`, data)

    document.dispatchEvent(customEvent)
  },

  on (event, handler, context) {
    if (!this.__handlerMap[event]) {
      this.__handlerMap[event] = []

      const callback = ev => {
        this.__handlerMap[event].forEach(cb => cb.call(context, ev))
      }

      new Task({
        module: 'system',
        method: 'addListener',
        data: {
          messageId: event
        }
      }).call()
      document.addEventListener(event, callback)

      this.__offHandlerMap[event] = function () {
        new Task({
          module: 'system',
          method: 'removeListener',
          data: {
            messageId: event
          }
        }).call()
        document.removeEventListener(event, callback)
      }
    }

    this.__handlerMap[event].push(handler)

    return this
  },

  off (event, handler) {
    // 解绑全部事件
    if (!event && !handler) {
      for (const offHandler in this.__offHandlerMap) {
        offHandler()
      }

      this.__offHandlerMap = {}
      this.__handlerMap = {}

      return true
    }

    if (!this.__handlerMap[event]) return true

    if (handler) {
      this.__handlerMap[event].some((cb, index) => {
        if (cb === handler) {
          this.__handlerMap[event].splice(index, 1)
          return true
        }

        return false
      })
    }

    if (!handler || !this.__handlerMap[event].length) {
      delete this.__handlerMap[event]
      this.__offHandlerMap[event] && this.__offHandlerMap[event]()
      delete this.__offHandlerMap[event]
    }

    return true
  }
}

window.onCallback = function (taskId, errorInfo, result) {
  const task = TASK_MAP[taskId]

  if (!task) {
    return console.error('接口：回调被触发，但是没有调用记录')
  }

  delete TASK_MAP[taskId]

  if (errorInfo) {
    return task.reject(errorInfo)
  }

  try {
    result = JSON.parse(decodeURIComponent(result))
  } catch (e) {
    console.error(`接口：${task.data.module}.${task.data.method}返回成功，解析错误：`, result)
  }

  if (errorInfo) {
    console.error(`接口：${task.data.module}.${task.data.method}返回错误，返回数据：`, errorInfo)
  } else {
    console.success(`接口：${task.data.module}.${task.data.method}返回成功，返回数据：`, result)
  }

  return task.resolve(result)
}

window.onEvent = function (event, result) {
  try {
    result = JSON.parse(decodeURIComponent(result))
  } catch (e) {}

  Event.dispatch(event, result)
}

const CANCEL_MAP = {}

export default {
  on (event, callback, context) {
    return Event.on(event, callback, context)
  },

  off (event, callback) {
    return Event.off(event, callback)
  },

  fire (event, data) {
    return Event.fire(event, data)
  },

  call (module = '', method = '', data = {}, cancelable) {
    console.log('data: ', data)
    console.log('method: ', method)
    console.log('module: ', module)
    const task = new Task({
      module,
      method,
      data
    })
    const moduleMethod = module + '.' + method

    if (CANCEL_MAP[moduleMethod]) {
      delete CANCEL_MAP[moduleMethod]
    }

    if (cancelable) {
      CANCEL_MAP[moduleMethod] = task.id
    }

    TASK_MAP[task.id] = task
    return task.call()
  },

  cancel (module, method) {
    const taskId = CANCEL_MAP[module + '.' + method]
    if (taskId) {
      console.warn(`接口：取消调用${module}.${method}`)
      delete TASK_MAP[taskId]
    }
  },

  isSupport () {
    return !!window.SHMJSBridge
  }
}
