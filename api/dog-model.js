const shortid = require('shortid')

let dogs = [
  { id: '1', name: 'Captain', weight: 25 },
  { id: '2', name: 'Doggo', weight: 13 },
]

module.exports = {
  async findAll() {
    return dogs
  },

  async findById(id) {
    const dog = dogs.find((d) => d.id === id)
    return dog
  },

  async create({ name, weight }) {
    const newDog = { id: shortid.generate(), name, weight }
    dogs.push(newDog)
    return newDog
  },

  async update(id, changes) {
    const dog = dogs.find((dog) => dog.id === id)
    if (!dog) return null

    const updatedDog = { ...changes, id }
    dogs = dogs.map((d) => (d.id === id ? updatedDog : d))
    return updatedDog
  },

  async delete(id) {
    const dog = dogs.find((dog) => dog.id === id)
    if (!dog) return null

    dogs = dogs.filter((d) => d.id !== id)
    return dog
  },
}
