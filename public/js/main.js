const socket = io();

//armamos la plantilla para el contenedorder de productos (manipulacion del doom)
const productsContainer = document.getElementById("products-table-body")

productsContainer.innerHTML= "<div></div>"

socket.on('products', products => {

    //mapeo del array    
    const allProductsElements = products.map(product => `
    <tr>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td><img height="72px" width="72px" src="${product.thumbnail}"/></td>
    </tr>
    `
    ).join(" ")

    productsContainer.innerHTML = allProductsElements;
})