let j = 0;
var array;
var cart = [];

window.onload = fetchProducts();

function fetchProducts() {
    fetch('https://fakestoreapi.com/products/')
        .then(response => response.json())
        .then(data => renderProducts(data));
}

function renderProducts(products) {
    document.getElementById('productList').innerHTML = '';
    console.log("called")
    console.log(products)
    array = products;
    const productList = document.getElementById('productList');
        for(i=0;i<products.length;i++){
        const item = document.createElement('div');
        item.className = "outerDiv"
        item.innerHTML = `
        <div class='img-box'>
            <img class='images' src=${products[i].image}></img>
        </div>
        <div class='bottom'>
            <p>${products[i].title}</p>
            <h2>RS. ${products[i].price}<h2>
            <button onclick='addtocart(${j++})'>Add to Cart</button>
        </div>
      `;
        productList.appendChild(item);
    }
}

function applyFilter(){
    var opt = document.getElementById("filterOpt");
    var value = opt.options[opt.selectedIndex].value;
    var sortArray;
    if(value == 0){
        sortArray =array.sort((a, b) => Number(a.price) - Number(b.price));
    }
    else{
        sortArray =array.sort((a, b) => Number(b.price) - Number(a.price)); 
    }
    renderProducts(sortArray)
}

function openCart(){
    document.getElementById('productDiv').style.display = 'none';
    document.getElementById('cartDiv').style.display = 'block';
}

function openProducts(){
    document.getElementById('productDiv').style.display = 'block';
    document.getElementById('cartDiv').style.display = 'none';
}


function addtocart(a) {
    cart.push(array[a]);
    displaycart()
}

function delElement(a) {
    cart.splice(a, 1);
    displaycart();
}


function displaycart(a) {
    let j = 0, total = 0;
    document.getElementById('cartItem').innerHTML = '';
    document.getElementById('count').innerHTML = cart.length;
    console.log(cart)
    console.log(cart.length)
    if (cart.length == 0) {
        console.log("abb")
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById('total').innerHTML = "Rs." + 0 + "";
    }
    else {
        const itemList = document.getElementById("cartItem")
        for(i=0;i<cart.length;i++){
            const item = document.createElement('div');
            total = total + cart[i].price;
            document.getElementById('total').innerHTML = "Rs." + total + "";
            item.innerHTML = `
            <div class='cart-item'>
                    <div class='row-img'>
                    <img class='rowimg' src=${cart[i].image}>
                    </div>
                    <p style='font-size:14px'>${cart[i].title}</p>
                    <h3 style='font-size:15px'>${cart[i].price}</h3>
                    <p onclick='delElement(${j++})'>Delete</p></div>
          `;
          itemList.appendChild(item);
        }
    }
}
