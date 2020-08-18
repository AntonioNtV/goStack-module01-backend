const express = require('express')
const { v4, validate } = require('uuid')

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
  * 
  * Query Params: Filtros e Paginação
  * Route Params: Identificar recursos (Atualizar ou Deletar).
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
  */

  /**
   * Middleware
   * 
   * Interceptador de Requisições que interrompe totalmente a requisição ou alterar dados da requisição.
   * 
   */

const projects = []

function logRequest(request, response, next) {
    const { method, url } = request

    const logLabel = `[${method.toUpperCase()}] ${url}`

    console.time(logLabel)

    next()

    console.timeEnd(logLabel)

}

function validateProjectId(request, response, next) {
    const { id } = request.params

    if (!validate(id)) {
        return response.status(400).json({
            error: 'Invalid project ID'
        })
    }
    
    return next()

}

app.use(logRequest)

app.get('/projects', (request, response) => {
    const { title } = request.query

    const results = title
        ? projects.filter( project => project.title.includes(title))
        : projects

    return response.json(results)
})

app.post('/projects', (request, response) => {
    const { title, owner } = request.body
    
    const project = {
        id: v4(),
        title,
        owner,
    }

    projects.push(project)

    return response.json(project)
})

app.put('/projects/:id', validateProjectId, (request, response) => {
    const { id } = request.params
    const { title, owner } = request.body
    
    const projectIndex = projects.findIndex( project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({
            error: 'Project not found'
        })
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return response.json(project)
})

app.delete('/projects/:id', validateProjectId, (request, response) => {
    const { id } = request.params

    const projectIndex = projects.findIndex( project => project.id === id)

    if (projectIndex < 0) {
        return response.status(400).json({
            error: 'Project not found'
        })
    }

    projects.splice(projectIndex, 1)

    return response.status(204).send()
})

app.use(express.json())

app.listen(3333, () => {
    console.log('Express server running at port 3333');
})