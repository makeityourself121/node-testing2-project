const express = require('express')
const Dog = require('./dog-model.js')
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ message: 'hey there' })
})

server.get('/api/dogs', (req, res) => {
  Dog.findAll()
    .then((dogs) => {
      res.status(200).json(dogs)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: err.message })
    })
})

server.post('/api/dogs', (req, res) => {
  const newDog = req.body
  Dog.create(newDog)
    .then((dog) => {
      res.status(201).json(dog)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: err.message })
    })
})

server.delete('/api/dogs/:id', (req, res) => {
  Dog.delete(req.params.id)
    .then((dog) => {
      if (dog) {
        res.status(200).json(dog)
      } else {
        res.status(404).json({
          message: `dog ${req.params.id} not real!!!`,
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: err.message })
    })
})

module.exports = server
