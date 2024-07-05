const mongoose = require('../../config/mongo')
const { Schema } = mongoose

const livroSchema = new Schema(
  {
    titulo: String,
    pages: Number,
    isbn: String,
    editora: String,
  },
  {
    timestamps: true
  }
)

const livroModel = mongoose.model('livros', livroSchema)

module.exports = livroModel;