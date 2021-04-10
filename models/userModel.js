const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: String,
  firstname: String,
  lastname: String,
  email: String
})

const User = mongoose.model('User', userSchema)

module.exports = userSchema
