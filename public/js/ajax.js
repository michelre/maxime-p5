
class Ajax {

    get(url){
        return new Promise(function(resolve, reject){
            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function(){
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if(xhr.status === 200){
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        reject()
                    }
                }
            }

            xhr.open('GET', url)
            xhr.send();
        })
    }

    post(){
        //TODO: Validation de la commande
    }


}