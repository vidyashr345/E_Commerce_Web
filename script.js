const product = [
    {id: 1,name:"Radio",Image:"https://tse4.mm.bing.net/th?id=OIP.ZzZBIhzTFn10UtyCUsYTqgHaGk&pid=Api&P=0&h=180",price:2500},
    {id: 2,name:"Webcam",Image:"https://tse4.mm.bing.net/th?id=OIP.d8uT_SBQULwXATyr11D5bgHaIg&pid=Api&P=0&h=180",price:70000},
    {id: 3,name:"Laptop",Image:"https://tse3.mm.bing.net/th?id=OIP.y6nHWpwz5muoIPKWAUvkbQHaHa&pid=Api&P=0&h=180",price:40000},
    {id: 4,name:"Smartwatch",Image:"https://tse3.mm.bing.net/th?id=OIP.df8F1-6E6AKpw4OjMyG9oAHaE7&pid=Api&P=0&h=180",price:5000},
    {id: 5,name:"cycle",Image:"https://tse1.mm.bing.net/th?id=OIF.%2f20diGB62ek7kAmrvUx7hA&pid=Api&P=0&h=180",price:8900},
    {id: 6,name:"Toy",Image:"https://tse4.mm.bing.net/th?id=OIP.ypqOO0xLtFlElXzz-yyaSQHaHa&pid=Api&P=0&h=180",price:8800},
    {id: 7,name:"Mobile",Image:"https://tse4.mm.bing.net/th?id=OIP.WvMgoG4QB4teucxXluKFFAHaEK&pid=Api&P=0&h=180",price:76000},
    {id: 8,name:"Computer",Image:"https://tse1.mm.bing.net/th?id=OIP.hzJYgtJ0g08_PZWMTjevYwHaEK&pid=Api&P=0&h=180",price:10000},
]
function renderProducts(products,productList){
    const container = document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product=> {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick = "addToCart(${product.id})">Add to cart</button>
        `
      container.appendChild(productDiv);
    })
}

if(document.getElementById("productList"))renderProducts(product,"productList");
if(document.getElementById("cartItems"))renderCart();

//search  
function searchProducts(query){
    const filterProducts = product.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    )
    renderProducts(filterProducts,"productList");
}

//add EventListner to button
document.getElementById("searchButton")?.addEventListener("click",()=>{
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//sorting
function sortProducts(criteria){
    if(criteria == "price"){
        return product.sort((a,b) => a.price-b.price);
    }
    return product;
}

//Adding Event listners
document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})

//add to cart

if(document.getElementById("productList"))renderProducts(product,"productList");

function addToCart(productId){
    const products = product.find(p => p.id === productId);
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart.push(products);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert(`${products.name} is added to cart`)
    renderCart();
}

//remove from cart
function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item=>item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed successfully");
    renderCart();
}

//calculate subtotal
function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total+item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.lenght > 0){
        subtotalContainer.innerHTML = `subtotal : Rs. ${subtotal}`
    }
    else{
        subtotalContainer.innerHTML = `No items in the cart`
    }
}
//Render items in cart

function renderCart(){
    const cart = JSON.parse(localStorage.getItem("cart"))||[];
    const container = document.getElementById("cartItems");
    container.innerHTML = "";
    if(cart.length == 0){
        container.innerHTML="<h1>Your Cart is Empty</h1>"
    }
    cart.forEach(item => {
        const cartDiv = document.createElement("div");
        cartDiv.classList.add("cart-item");
        cartDiv.innerHTML=`
        <img src="${item.Image}"/>
        <h3>${item.name}</h3>
        <h2>${item.price}</h2>
        <button onclick="removeFromCart(${item.id})">Remove</button>
    `
    container.appendChild(cartDiv);
    })
}

if(document.getElementById("productList"))renderProducts(product,"productList");
if(document.getElementById("cartItems"))renderCart();