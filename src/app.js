import express from 'express'
import productRouter from './routers/products.router.js'
import cartRouter from './routers/cart.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static('public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use('/', (req, res) => res.send('Pricipal Page'))

const PORT = 8080

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

server.on('error', () => console.log('ERROR'))