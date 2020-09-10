const ajax = new Ajax();


const params = new URLSearchParams(document.location.search.substring(1))
const productId = params.get('productId')

function displayTeddieDetails(teddieData){
    const mainProduct = document.querySelector('.main_product')
    mainProduct.innerHTML = `<div class="product_section">
            <h1 id="product_title">${teddieData.name}</h1>
            <div class="image_section">
                <img src="${teddieData.imageUrl}" alt="ourson en peluche">
            </div>
            <div class="product_description">
                <p>${teddieData.description}</p>
            </div>
        </div>
        <aside>
            <h2>${teddieData.name}</h2>
            <div class="product_description">
                <p>${teddieData.price/100}€</p>
            </div>
            <div class="product_option">
                <select>
                    ${teddieData.colors.map((color) => `<option value="${color}">${color}</option>`)}
                </select>
            </div>
            <div class="basket_add_section">
                <button type="button" id="basket_add_button">Ajouter au pannier</button>
            </div>
        </aside>`
        
        var basketAdd = document.getElementById('basket_add_button');
        var counter = localStorage.getItem('counter');
        
        basketAdd.onclick = function() {
            localStorage.setItem(teddieData.name+counter++, productId);
        }
        console.log(basketAdd);
}

ajax
    .get(`https://oc-p5-api.herokuapp.com/api/teddies/${productId}`)
    .then((teddieData) => {
        displayTeddieDetails(teddieData)
    })

    




        