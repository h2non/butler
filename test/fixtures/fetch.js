self.addEventListener('fetch', function (event) {
  return new Response('Hello Chuck', { status: 204 })
})
