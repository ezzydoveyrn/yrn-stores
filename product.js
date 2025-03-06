const products = [
  {
    name: "Image 1",
    source: "images/4.jpeg",
    id: 1,
    priceCents: 1099,
  },
  {
    name: "Image 2",
    source: "images/5.jpeg",
    id: 2,
    priceCents: 1290,
  },
  {
    name: "Image 3",
    source: "images/6.jpeg",
    id: 3,
    priceCents: 1399,
  },
  {
    name: "Image 4",
    source: "images/7.jpeg",
    id: 4,
    priceCents: 1499,
  },
  {
    name: "Image 5",
    source: "images/8.jpeg",
    id: 5,
    priceCents: 1599,
  },
  {
    name: "Image 6",
    source: "images/9.jpeg",
    id: 6,
    priceCents: 1699,
  },
  {
    name: "Image 7",
    source: "images/10.jpeg",
    id: 7,
    priceCents: 1799,
  },
  {
    name: "Image 8",
    source: "images/11.jpeg",
    id: 8,
    priceCents: 1899,
  },
  {
    name: "Image 9",
    source: "images/12.jpeg",
    id: 9,
    priceCents: 1999,
  },
  {
    name: "Image 10",
    source: "images/13.jpeg",
    id: 10,
    priceCents: 2099,
  },
  {
    name: "Image 11",
    source: "images/14.jpeg",
    id: 11,
    priceCents: 2199,
  },
  {
    name: "Image 12",
    source: "images/15.jpeg",
    id: 12,
    priceCents: 2299,
  },
];



const container = document.querySelector(".container");

products.forEach((product)=>{
  let HTML = `
  <div class="card">
    <div class="image">
      <img src="${product.source}">
    </div>
    <div class="details">
      <p>${product.name}</p>
      <p>$${(product.priceCents / 100).toFixed(2)}</p>
    </div>
    <div class="buttons">
      <button data-product-id="${product.id}" data-product-name="${
    product.name
  }" data-product-image="${product.source}" data-product-pricecents="${
    product.priceCents
  }">Add to cart</button>
    </div>
  </div>
  `;
  container.innerHTML += HTML;
});

let addToCartBTNS = document.querySelectorAll("button");
const CART = JSON.parse(localStorage.getItem("cart")) || [];

addToCartBTNS.forEach((button, index)=>{
  button.addEventListener("click", ()=>{
    let buttonId = button.dataset.productId;
    let buttonName = button.dataset.productName;
    let buttonImage = button.dataset.productImage;
    let buttonPricecent = button.dataset.productPricecents;
    buttonPricecent = Number(buttonPricecent);


    if(CART[index]){
      CART[index].quantity++;
    }else if (!CART[index]){
      CART.push({
        productID: buttonId,
        productNAME: buttonName,
        productIMAGE: buttonImage,
        productPricecent: buttonPricecent,
        quantity: 1,
      });
    }
    CART.forEach((item)=>{
      item.itemCostCalc = item.quantity * item.productPricecent;
    })
    localStorage.setItem("cart", JSON.stringify(CART)); 
  });
  
  
})
let totalCOST = CART.reduce((accumulator, value, index, arr)=>{
  return arr[index].itemCostCalc + accumulator;
}, 0);
totalCOST = `$ ${(totalCOST / 100).toFixed(2)}`;

CART.forEach((item)=>{
  let cartHTML = `
  <div class="cartContainer">
    <div class="cartImage">
      <img src="${item.productIMAGE}">
    </div>
    <div class="detailsCart">
      <h3>${item.productNAME}</h3>
      <p>
        Price: ${(item.productPricecent / 100).toFixed(2)}
        Quantity: ${item.quantity}
      </p>
      <p>
        Sub-Total: ${(item.itemCostCalc / 100).toFixed(2)}
      </p>
    </div>
  </div>
  `;
  document.querySelector(".bodyCart").innerHTML += cartHTML;
  
});
