const express = require('express')
const cors = require('cors')
const livroModel = require('./src/module/livro/livro.model')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/livros', async(req, res) => {
  const livros = await livroModel.find({})
  if(!livros) {
    return res.status(400).json({ message: 'Nenhum livro cadastrado.'})
  }
  return res.status(200).json(livros)
})

app.get('/livros/:id', async(req, res) => {
  const { id } = req.params

  try {
    const livro = await livroModel.findById(id)
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' })
    }

    return res.status(200).json(livro)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o livro', error })
  }
})

app.post('/livros', async(req, res) => {
  if (!req.body.titulo) {
    return res.status(400).json({message: 'Título do livro é obrigatório.'})
  }
  if (!req.body.pages) {
    return res.status(400).json({message: 'Número de páginas é obrigatório.'})
  }
  if (!req.body.isbn) {
    return res.status(400).json({message: 'Código ISBN é obrigatório.'})
  }
  if (!req.body.editora) {
    return res.status(400).json({message: 'Editora é obrigatório.'})
  }

  const livro = await livroModel.create({
    titulo: req.body.titulo,
    pages: req.body.pages,
    isbn: req.body.isbn,
    editora: req.body.editora,
  })
  
  return res.status(200).json(livro)
})

app.delete('/livros/:id', async(req, res) => {
  const { id } = req.params

  try {
    const livro = await livroModel.findByIdAndDelete(id)
    if(!livro) {
      return res.status(404).json({ message: 'Livro não encontrado'})
    }

    return res.status(200).json({ message: 'Livro deletado com sucesso'})
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao deletar o livro', error})
  }
})

app.put('/livros/:id', async(req, res) => {
  const { id } = req.params
  const { titulo, pages, isbn, editora } = req.body

  try {
    const livro = await livroModel.findByIdAndUpdate(id, { titulo, pages, isbn, editora }, { new: true, runValidators: true })
    if (!livro) {
      return res.status(404).json({ message: 'Livro não encontrado' })
    }

    return res.status(200).json({ message: 'Livro atualizado com sucesso'})
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao atualizar o livro', error })
  }
})

app.listen(8080, () => {
  console.log('O servidor está rodando na porta 8080')
})