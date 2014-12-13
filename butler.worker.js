'use strict'

var store = []

function removeById(id) {
  for (var i = 0, l = store.length; i < l; i += 1) {
    if (store[i].id === id) {
      store.splice(i, 1)
      break
    }
  }
}

self.addEventListener('message', function (event) {
  var data = event.data
  if (data) {
    switch (data.topic) {
      case 'butler.create':
        store.push({ id: data.id, config: data.config })
        break
      case 'butler.remove':
        removeById(data.id)
        break
      case 'butler.sync':
        store = data.config
        break
      case 'butler.flush':
        store = []
        break
    }
  }
})

