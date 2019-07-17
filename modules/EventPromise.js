class EventPromise {
  constructor() {
    this._events = []
    this._listeners = {}
  }

  on(eventName, ...listeners) {
    listeners = listeners.filter(listener => listener instanceof Function)
    if (typeof eventName != 'string' || !listeners.length)
      return
    this._addEvent(eventName)
    listeners.forEach(listener => this._addListener(eventName, listener))
  }

  once(eventName, ...listeners) {
    listeners = listeners.filter(listener => listener instanceof Function)
    if (typeof eventName != 'string' || !listeners.length)
      return
    this._addEvent(eventName)
    listeners.forEach(listener => this._addListenerOnce(eventName, listener))
  }

  emit(eventName, ...data) {
    let eventListeners = this._listeners[eventName]
    if (!(eventListeners instanceof Array))
      return
    return Promise.all(eventListeners.map(listener => listener(...data)))
  }

  removeListener(eventName, listener) {
    let eventListeners = this._listeners[eventName],
      listenerIndex
    if (!(eventListeners instanceof Array))
      return
    listenerIndex = eventListeners.indexOf(listener)
    if (listenerIndex < 0)
      return
    return eventListeners.splice(listenerIndex, 1)
  }

  removeAllListeners(eventName) {
    if (!this._listeners[eventName])
      return
    delete this._listeners[eventName]
    return this._events.splice(this._events.indexOf(eventName), 1)
  }

  removeAllEvents() {
    this._events = []
    this._listeners = {}
  }

  _addEvent(event) {
    if (this._events.indexOf(event) >= 0)
      return
    this._events.push(event)
    this._listeners[event] = []
  }

  _addListener(eventName, listener) {
    let eventListeners = this._listeners[eventName]
    if (!(eventListeners instanceof Array) || eventListeners.indexOf(listener) >= 0)
      return
    eventListeners.push(listener)
  }

  _addListenerOnce(eventName, listener) {
    let listenerOnce = (...data) => {
      this.removeListener(eventName, listenerOnce)
      return listener(...data)
    }
    this._addListener(eventName, listenerOnce)
  }
}

module.exports = EventPromise
