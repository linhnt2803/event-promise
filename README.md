# event-promise
A respository for npm [lt-event-promise](https://www.npmjs.com/package/lt-event-promise)

Same as node module event.EventEmitter but return Promise of executing listeners when call emit()

## Installing

Using npm

```console
npm i lt-event-promise
```

With node
```js
const EventPromise = require('lt-event-promise')
const emitter = new EventPromise()
```

With client using webpack
```js
import EventPromise from 'lt-event-promise'
const emitter = new EventPromise()
```

## Basic usage

```js

emitter.on('hello', () => console.log('Hello world!'))
emitter.emit('hello')

```

```console
Hello world!
```

## Using Promise and async/await

###### Using Promise

```js
emitter.on('task', longTask)
emitter.emit('task')
  .then(console.log)

function longTask() {
  return new Promise(resolve => {
    setTimeout(() => resolve('data'), 2000)
  })
}
```

```console
[ 'data' ]
```

###### Many listeners

```js
emitter.on('task', task1, task2)
emitter.emit('task')
  .then(console.log)
  
function task1() { return 'data1' }
function task2() { return 'data2' }
```

```console
[ 'data1', 'data2' ]
```

###### Error handling

```js
emitter.on('task', task, errorTask)
emitter.emit('task')
  .then(console.log)
  .catch(err => {
    console.log('catch error here')
    console.log(err)
  })

function task() { return 'data' }
function errorTask() { throw new Error('Something went wrong!') }
```

```console
'catch error here'
...
throw new Error('Something went wrong!')
^
Error: Something went wrong!
...
```

###### Using async/await

```js
emitter.on('task', task1, task2)

try {
  let datas = await emitter.emit('task')
  console.log(datas)
} catch(err) {
  console.error(err)
}
```
```console
[ 'data1', 'data2' ]
```

###### .on and .once

```js
emitter.on('task', onTask)
emitter.once('task', onceTask)

emitter.emit('task')
  .then(datas => console.log('First emit:', datas))

emitter.emit('task')
  .then(datas => console.log('Next emit:', datas))

function onTask() { return 'onData' }
function onceTask() { return 'onceData' }
```

```console
First emit: [ 'onData', 'onceData' ]
Next emit: [ 'onData' ]
```

## License

MIT
