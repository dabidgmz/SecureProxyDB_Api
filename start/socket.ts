import WebSocketService from 'App/Services/WebSocketService'
WebSocketService.boot()

/**
 * Listen for incoming socket connections
 */
WebSocketService.io.on('connection', (socket) => {
  console.log("socket ",socket.id)
  socket.emit('news', { hello: 'world' })

  socket.on('my other event', (data) => {
    console.log(data)
  })
})