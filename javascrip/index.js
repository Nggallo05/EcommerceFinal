const cards = document.getElementById('cards');
cards.addEventListener('click', (e) => {
    addToCard(e)
});
const items = document.getElementById('items');
items.addEventListener('click', e => {
    accionBtn(e)
})
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content;
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const fragment = document.createDocumentFragment()
let carrito = {}



const URLJSON = "data/data.json"
$("#btn-productos").click(() => {
    $.getJSON(URLJSON, function (resp, state) {
        if (state === "success") {
            let myData = resp;
            CompleteCards(myData)
            if (localStorage.getItem('compras')) {
                compras = JSON.parse(localStorage.getItem('compras'))
                completeCarrito()
            }
        }
    });
});




