const express = require('express')

const app = express()
app.use(express.json())

/**
 * Métodos HTTP
 * 
 * GET: Buscar Informações do Backend
 * POST: Criar uma informação no Backend
 * PUT/PATCH: Alterar uma informação no Backend
 * DELETE: Deletar uma informação no Backend
 */

 /**
  * Tipos de parâmetros:
  * Query Params: Filtros e Paginação
  * Route Params: Identificar recursos (Atualizar ou Deletar).
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
  */


app.get('/projects', (request, response) => {
    const { title, owner } = request.query

    console.log(title, owner);

    return response.json([
        'Projeto 1',
        'Projeto 2'
    ])
})

app.post('/projects', (request, response) => {
    const { title, owner } = request.body
    
    console.log(title, owner);

    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params

    console.log('id:', id);

    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ])
})

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params

    console.log('id:', id);

    return response.json([
        'Projeto 4',
        'Projeto 3'
    ])
})

app.use(express.json())

app.listen(3333, () => {
    console.log('Express server running at port 3333');
})