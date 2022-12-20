import { Router } from "express";
import { fileManager } from "./products.router.js";


const router = Router()

router.get("/", async (req, res) => {

    const products = await fileManager.get()
    res.render("home",{products})
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})

export {router as ViewsRouter}