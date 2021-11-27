const CompleteCards = myData => {
    myData.forEach(products => {
        templateCard.querySelector('h5').textContent = products.title
        templateCard.querySelector('p').textContent = products.price
        templateCard.querySelector('img').setAttribute('src', products.image);
        templateCard.querySelector('.btn-dark').dataset.id = products.id
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    });
    cards.appendChild(fragment)
}

const addToCard = e => {
    if (e.target.classList.contains('btn-dark')) {
        setCarrito((e.target.parentElement))
    }
    e.stopPropagation()
}

const setCarrito = object => {
    const product = {
        id: object.querySelector('.btn-dark').dataset.id,
        title: object.querySelector('h5').textContent,
        price: object.querySelector('p').textContent,
        cantidad: 1

    }
    if (carrito.hasOwnProperty(product.id)) {
        product.cantidad = carrito[product.id].cantidad + 1
    }

    carrito[product.id] = { ...product }
    completeCarrito()
}

const completeCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(product => {
        templateCarrito.querySelector('th').textContent = product.id,
            templateCarrito.querySelectorAll('td')[0].textContent = product.title
        templateCarrito.querySelectorAll('td')[1].textContent = product.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = product.id
        templateCarrito.querySelector('.btn-danger').dataset.id = product.id
        templateCarrito.querySelector('span').textContent = product.cantidad * product.price

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    completeFooter()
    localStorage.setItem('compras', JSON.stringify(carrito))
}

const completeFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
            <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
            `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nPrice = Object.values(carrito).reduce((acc, { cantidad, price }) => acc + cantidad * price, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad;
    templateFooter.querySelector('span').textContent = nPrice;

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciado = document.getElementById('vaciar-carrito')
    btnVaciado.addEventListener('click', () => {
        carrito = {}
        completeCarrito()
    })

    const btnFinalizar = document.getElementById('finalizar-compra')
    btnFinalizar.addEventListener('click', () => {
        carrito = {}
        completeCarrito()
    })
}

const accionBtn = e => {
    if (e.target.classList.contains('btn-info')) {
        carrito[e.target.dataset.id]

        const product = carrito[e.target.dataset.id]
        product.cantidad++
        carrito[e.target.dataset.id] = { ...product }
        completeCarrito()

    }
    if (e.target.classList.contains('btn-danger')) {
        const product = carrito[e.target.dataset.id]
        product.cantidad--
        if (product.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        completeCarrito()
    }

    e.stopPropagation()
}