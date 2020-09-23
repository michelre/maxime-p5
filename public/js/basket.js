const basketContent = document.querySelector('#basket_content')

// Récupérer le contenu du localStorage (key: cart)
const cart = JSON.parse(localStorage.getItem('cart')) || []
let keys = Object.keys(cart);

let quantity = 1;

//Fonction de supression d'un produit
function removeItem(key) {
    if (confirm('Etes-vous sûr de vouloir supprimer le produit?')) {
        // On supprime du localStorage la clé du produit
        delete cart[key]
        localStorage.setItem('cart', JSON.stringify(cart));
        keys = Object.keys(cart)
        if (keys.length === 0) {
            basketContent.innerHTML = '<h3>Le panier est vide</h3>'
        } else {
            // On supprime visuellement la ligne du tableau
            const line = document.querySelector(`[data-key="${key}"]`)
            line.remove()
            //Recalcul du total du pannier
            document.querySelector(`#total`).innerHTML = getTotalCart();
        }
    }
}

// TOTAL PRICE PER TEDDY
function getTotalPricePerTeddy(quantity, price) {
    const goodPrice = Math.round(price) / 100;
    const totalPerTeddies = quantity * goodPrice;
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(totalPerTeddies)
}

// TOTAL PRICE PER CART
function computeTotals(key) {
    const product = cart[key]
    const totalPricePerTeddy = getTotalPricePerTeddy(product.quantity, product.price)
    document.querySelector(`[data-key="${key}"] td:last-child`).innerHTML = totalPricePerTeddy;
    document.querySelector(`#total`).innerHTML = getTotalCart();
}

function getTotalCart() {
    let total = 0;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        total += cart[key].quantity * (cart[key].price / 100)
    }
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(total)
}

// ADD LINE LAYOUT
function addLine(key, name, choosenColor, quantity, price, imageUrl) {

    const goodPrice = Math.round(price) / 100
    const formatPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(goodPrice)
    const totalPricePerTeddy = getTotalPricePerTeddy(quantity, price)

    return `<tr data-key="${key}">
        <td id="checkout-product-image" style="background-image:url(${imageUrl});background-size:16vh;background-repeat:no-repeat;background-position:center;"></td>
        <td>${name}</td>
        <td>${choosenColor}</td>
        <td id="quantity-layout">
        <span class="orderQuantity">${quantity}</span>
        </td>
        <td>
        <button class="remove" data-key="${key}">X</button>
        </td>
        <td>${formatPrice}</td>
        <td id="total-price" class="sum-per-teddy">${totalPricePerTeddy}</td>
    </tr>`
}


// Prévoir le cas ou le panier est vide (afficher un message)
if (keys.length === 0) {
    basketContent.innerHTML = '<h3>Le panier est vide</h3>'
} else {
    const tbody = basketContent.querySelector('#tbody')

    // Création du DOM
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const product = cart[key]

        const tr = addLine(key, product.name, product.color, product.quantity, product.price, product.imageUrl);
        tbody.innerHTML += tr

    }

    tbody.innerHTML += `<tr>
        <td id="total-line" colspan="6">Total</td>
        <td id="total">${getTotalCart()}</td>
    </tr>`

    for (let i = 0; i < keys.length; i++) {
        document.querySelector(`[data-key="${keys[i]}"] .remove`).addEventListener('click', () => removeItem(keys[i]));
    }
}
//Formulaire
function displayForm() {
    document.querySelector(".formulaire").style.display = "block";
}

const checkoutButton = document.querySelector('#checkout')

checkoutButton.addEventListener('submit', (e) => {
    e.preventDefault()
    const totalToPay = getTotalCart()
    const orderTeddies = {
        products: [],
        contact: {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            address: e.target.address.value,
            city: e.target.city.value,
            email: e.target.email.value,
        }
    }

    let products = orderTeddies.products
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const product = cart[key]
        const productsOrdered = product._id
        products.push(productsOrdered)
    }
    const ajax = new Ajax()
    ajax.postOrder(orderTeddies)
        .then((resp) => {
            localStorage.removeItem('cart');
            window.location.href = `commande.html?orderId=${resp.orderId}&firstName=${resp.contact.firstName}&lastName=${resp.contact.lastName}&totalToPay=${totalToPay}`
        })
});
