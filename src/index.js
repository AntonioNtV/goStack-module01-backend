const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (request, response) => {
    return response.json({
        message: 'Hello World'
    })
})

app.use(express.json())

app.listen(3333, () => {
    console.log('Express server running at port 3333');
})