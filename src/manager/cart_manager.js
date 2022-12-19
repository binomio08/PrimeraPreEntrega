import fs from 'fs'

class CartManager {
    constructor(path) {
        this.path = path
    }
    //Lee
    read = () => {
        if (fs.existsSync(this.path)) {
            return fs.promises.readFile(this.path, 'utf-8').then(r => JSON.parse(r))
        }

        return []
    }
    //Genera ID automaticos
    getNextID = list => {
        const count = list.length
        return (count > 0) ? list[count - 1].id + 1 : 1
    }
    //Escribe
    write = list => {
        return fs.promises.writeFile(this.path, JSON.stringify(list))
    }
    //Devuelve todos los carritos
    get = async () => {
        const data = await this.read()
        return data
    }
    //Trae un solo carrito por ID
    getByID = async (id) => {
        const data = await this.read()

        return data.find(p => p.id == id)
    }
    //crea los carritos
    create = async () => {
        //Lee todos los carritos
        const carts = await this.read()
        //Analisa cual es el siguiente ID del siguiente carrito si no hay trae ID 1
        const nextID = this.getNextID(carts)
        //genera el carrito desde cero
        const newCart = {
            id: nextID,
            products: []
        }
        carts.push(newCart)

        await this.write(carts)

        return newCart
    }

    update = async (id, obj) => {
        obj.id = id
        const list = await this.read()

        for (let i = 0; i < list.length; i++) {
            if (list[i].id == id) {
                list[i] = obj
                break
            }

        }

        await this.write(list)
    }
    //agrega productos
    addProduct = async (cartID, productID) => {
        //Buscamos el Cart Correspondiente
        const cart = await this.getByID(cartID)
        //buscamos que el producto exista
        let found = false
        for (let i = 0; i < cart.products.length; i++) {
            if(cart.products[i].id == productID) {

                cart.products[i].quantity++

                found = true
                break
            }
        }
        //si no lo encontró agrega ese producto
        if (!found) {
            cart.products.push({ id: productID, quantity: 1 })
        }

        await this.update(cartID, cart)

        return cart

    }


}

export default CartManager