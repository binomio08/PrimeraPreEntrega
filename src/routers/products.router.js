import { Router } from "express";
import FileManager from "../manager/product_manager.js";

//donde se van a guardar los productos
const fileManager = new FileManager('produtcs.json')
const router = Router()

//llamamos al fileManager y consultamos productos
router.get('/', async (req, res) => {
    const produtcs = await fileManager.get()
    res.json({ produtcs })
})

//Agregar productos
router.post('/', async (req, res) => {
    const produtc = req.body
    const productAdded = await fileManager.add(produtc)

    //Resultado
    res.json({ status: "success", productAdded })
})

//Actualizar productos
router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid)
    const productToUpdate = req.body

    const product = await fileManager.getByID(id)
    if (!product) return res.status(404).send('Product not found')

    //objet.keys pasas un objeto y te devuelve un array para validar las llaves del body
    for (const key of Object.keys(productToUpdate)) {
        product[key] = productToUpdate[key]
    }

    await fileManager.update(id, product)


    //Resultado
    res.json({ status: "success", product })
})

export default router;