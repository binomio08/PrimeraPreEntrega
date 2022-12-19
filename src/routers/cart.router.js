import { Router } from "express";
import CartManager from "../manager/cart_manager.js";

//donde se van a guardar los productos del carrito
const cartManager = new CartManager('carts.json')
const router = Router()

//llamamos al fileManager y consultamos todos los carritos
router.get('/', async (req, res) => {
    const carts = await cartManager.get()

    res.json({ carts })
})

//consultar un carrito
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const cart = await cartManager.getByID(id)

    res.json({ cart })
})

//Crear Nuevo Carrito
router.post('/', async (req, res) => {
    const newCart = await cartManager.create()

    res.json({ status: "success", newCart })
})

//agregar productos
router.post('/:cid/product/:pid', async (req, res) => {
    const cartID = parseInt(req.params.cid)
    const productID = parseInt(req.params.pid)

    const cart = await cartManager.addProduct(cartID, productID)

    //Resultado
    res.json({ status: "success", cart })
})

export default router;