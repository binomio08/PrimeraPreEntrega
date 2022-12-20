import express from 'express';
import productRouter, { fileManager } from './routers/products.router.js';
import cartRouter from './routers/cart.router.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import {Server as HttpServer} from 'http';
import {Server as IOServer} from 'socket.io';
import { ViewsRouter } from './routers/views.router.js';


const app = express();
//importar server http y server io
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//Configuracion de Handlebars
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs"
})
);

//configurar carpeta static (public) donde vamos a colocar nuestros archivos js y estilos
app.use(express.static("public"))

app.set("view engine", "hbs")
app.set("views", `${__dirname}/views`)

//Renderizado
app.use('/', ViewsRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/static', express.static('public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use('/', (req, res) => res.send('Pricipal Page'))

const PORT = 8080

const server = httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))

server.on('error', () => console.log('ERROR'))

//iniciar el servidor IO Socket
io.on('connection', async (socket) => {
    console.log(`New clien Connected, id: ${socket.id}`);
    
    io.sockets.emit('hello', 'HOLA')

    const products = await fileManager.get()

    io.sockets.emit("products", products)
})