const express = require('express')
const Dog = require('./dog-model.js')
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ message: 'hey there' })
})

server.get('/api/dogs/:id', (req, res) => {
  console.log('this is the id', req.params.id)
  Dog.findById(req.params.id)
    .then((dog) => {
      console.log(dog)
      if (dog) {
        res.status(200).json(dog)
      } else {
        console.log('methings this is it')
        res.status(404).json({ message: 'not found' })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: err.message })
    })
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

server.put('/api/dogs/:id', async (req, res) => {
  const { id } = req.params
  const changes = req.body
  console.log(id, changes)
  try {
    const result = await Dog.update(id, changes)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
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
