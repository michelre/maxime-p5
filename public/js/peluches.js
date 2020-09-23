const ajax = new Ajax();

function displayTeddies(teddiesData){
    const productLists = document.querySelector('.product_list')
    for(let i = 0; i < teddiesData.length; i++){
        productLists.innerHTML += `<a href="product.html?productId=${teddiesData[i]._id}" class="product">
           <img src="${teddiesData[i].imageUrl}" alt="image d'ourson en peluche">
           <h3>${teddiesData[i].name}</h3> 
        </a>`;
    }
}

ajax
    .get('https://oc-p5-api.herokuapp.com/api/teddies')
    .then((data) => {
        displayTeddies(data)
    }, () => {

    });