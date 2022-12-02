let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Balanza Analítica',
        tag: 'balanzaanalitica',
        price: 75,
        inCart:0
    },
    {
        name: 'Turbidimetro Hach Kit Portatil',
        tag: 'turbidimetrohachkitportatil',
        price: 105,
        inCart:0
    },
    {
        name: 'Refractómetro Hanna H196813',
        tag: 'refractometrohannah196813',
        price: 95,
        inCart:0
    },
    {
        name: 'Espectrofotómetro Genesys/Orion 40/50 Uv-Vis',
        tag: 'espectrofotómetrogenesys/orion40/50uv-vis',
        price: 45,
        inCart:0
    },
    {
        name: 'Manómetro 1/2 0-100 PSI',
        tag: 'manometro1/20-100psi',
        price: 55,
        inCart:0
    },
    {
        name: 'Dispensador automático',
        tag: 'dispensadorautomatico',
        price: 65,
        inCart:0
    },
    {
        name: 'Agitador de tubos de ensayo',
        tag: 'agitadordetubosdeensayo',
        price: 75,
        inCart:0
    },
    {
        name: 'Phmetro Hanna HI2110',
        tag: 'phmetrohannahi2110',
        price: 85,
        inCart:0
    }
];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
         cartItems = {
            [product.tag]: product
        }
    }
    
    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + 
        product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    let productContainer = document.querySelector
    (".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer ){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./images/equipos/${item.tag}.png">
                <span>${item.name}</span>
            </div>
            <div class="price">${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart * item.price},00
            </div>
            `
        });

        productContainer.innerHTML += `
            <div class"basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Total
                </h4>
                <h4 class="basketTotal">
                $${cartCost},00
                </h4>
                </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();

const handleRemoveItem = () => {
    const wrapper = document.querySelector('.cart_items_content');
    const items = wrapper.querySelectorAll('.single_cart_item');
    items.forEach((item) => {
      const removeBtn = item.querySelector('.remove_btn');
      removeBtn.addEventListener('click', () => {
        //handleCartItemCount();
        item.remove();
        handleCartItemCount();
      });
    });
  };