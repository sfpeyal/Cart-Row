//api fetch
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));

};

//calls function
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
       <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title.slice(0, 24)}</h3>
      <p class="fst-italic fw-bold">Category: ${product.category}</p>
      <p class="fst-italic fw-bold">Rating: ${product.rating.rate}</p>
      <p class="fst-italic fw-bold">Rate Count: ${product.rating.count}</p>
      <h2 class="text-muted">Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary">add to cart <span><i class="fas fa-cart-plus"></i></span></button>
      <button id="details-btn" class="btn btn-warning text-white">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

//add to cart
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

//getInputs
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value.toFixed(2));
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total.toFixed(2));
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", parseFloat(priceConverted * 0.2).toFixed(2))
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", parseFloat(priceConverted * 0.3).toFixed(2))
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", parseFloat(priceConverted * 0.4).toFixed(2))
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal.toFixed(2));
};
