async function getData() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("response is not ok");
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('catch error is ', error.message)
    }

}

getData().then((data) => {

    // const containerel = document.querySelector('.container');
    const inputel = document.querySelector('#input');
    const mainel = document.querySelector('main');

    function render(a) {

        let dataContainer = document.createElement("div");
        dataContainer.classList.add("dataContainer");

        let imageBox = document.createElement("div");
        imageBox.classList.add("imageBox");
        let img = document.createElement("img");
        img.src = a.image;
        img.alt = "image"

        imageBox.append(img);

        let contentBox = document.createElement("div");
        contentBox.classList.add("contentBox");

        let h1 = document.createElement("h1");
        h1.innerText = a.title;
        let p = document.createElement("p");
        p.innerText = a.description;
        let button = document.createElement("button");
        button.innerText = a.price;

        contentBox.append(h1, p, button);

        dataContainer.append(imageBox, contentBox);

        mainel.appendChild(dataContainer);

    };

    data.forEach(
        (product) => {
            render(product);
        }
    );

    inputel.addEventListener("input" , 
        () => {
            const inputValue = inputel.value.toString().toLowerCase();
            mainel.innerText = "";
            // if (!inputValue){
            //     mainel.innerText = "";
            // }
            if (inputValue){
                data.forEach(
                (b) => {
                    if ((b.title.toString().toLowerCase().includes(inputValue)) || (b.description.toString().toLowerCase().includes(inputValue)) || (b.price.toString().toLowerCase().includes(inputValue))){
                        // mainel.innerText = "";
                        render(b);
                    };
                }
            )
            };
            if ( (inputValue) && (!mainel.innerText) ){
                noProductTextel = document.createElement('div');
                noProductTextel.innerText = "no product found";
                noProductTextel.style.color = 'red';
                noProductTextel.style.textAlign = 'center';
                noProductTextel.style.margin = '20px';
                mainel.appendChild(noProductTextel);
            }

            if (inputel.value===""){
                mainel.innerText="";
                data.forEach((a) => {
                    render(a);
                })
            }
        }
    );
});
