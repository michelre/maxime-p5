const ajax = new Ajax();
const ul = document.querySelector('#products')
ajax.get('http://localhost:3000/api/cameras')
    .then(
        function (products) {
            //Resolve
            for(let i = 0; i < products.length; i++){
                ul.innerHTML += '<li>' +
                    '<img src="' + products[i].imageUrl + '" width="200px"/>' +
                    '<p>' + products[i].name + '</p>' +
                    '</li>'
            }
        },
        function () {
            //Reject
            console.log('reject')
        }
    )