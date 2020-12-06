const express = require('express')
const bodyParser = require('body-parser')
const notifier = require('node-notifier')
const helmet = require('helmet')
const app = express()
const port = process.env.port || 9000

app.use(bodyParser.json())
app.use(helmet())

app.get('/health', (_req, res) => {
  res.status(200).send()
})

app.post('/notify', (req, res) => {
  notify(req.body, reply => res.send(reply))
})

app.listen(port, () => {
  console.log(`Listenting on port ${port}`)
})

function notify({ title, message }, cb) {
  notifier.notify(
    {
      title: title || 'Unknown title',
      message: message || 'Unknown message',
      sound: true,
      wait: true,
      reply: true,
      closeLabel: 'Completed?',
      timeout: 15
    },
    (_err, _response, reply) => cb(reply)
  )
}
