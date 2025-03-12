const products = [
  {
    name: "Image 1",
    source: "images/4.jpeg",
    id: 1,
    priceCents: 1099,
  },
  {
    name: "Image 2",
    source: "images/sellwithNepSize.jpg",
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

function updateProds(){
  products.forEach((product) => {
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
}

const container = document.querySelector(".container");
function allAboutCart(){
  updateProds();
  let addToCartBTNS = document.querySelectorAll(".container button");
  const CART = JSON.parse(localStorage.getItem("cart")) || [];
  
  let cartCONTAINER = document.querySelector(".bodyCart");
  
  
  addToCartBTNS.forEach((button)=>{
    button.addEventListener("click", ()=>{
      let buttonId = Number(button.dataset.productId);
      let buttonName = button.dataset.productName;
      let buttonImage = button.dataset.productImage;
      let buttonPricecent = Number(button.dataset.productPricecents);
  
      let exisingItem = CART.find((item)=>{
        return item.productID === buttonId;
      })
      if(exisingItem){
        exisingItem.quantity++;
        exisingItem.productCostCalc =
          exisingItem.productPricecent * exisingItem.quantity;
      }else{
        CART.push({
          productID: buttonId,
          productNAME: buttonName,
          productIMAGE: buttonImage,
          productPricecent: buttonPricecent,
          quantity: 1,
          productCostCalc: buttonPricecent,
        });
      }
  
      
      localStorage.setItem("cart", JSON.stringify(CART));
      cartCONTAINER.innerHTML = "";
      renderProds();
    });
    
    
  })
  function renderProds(){
    let cartQuantityDisp = CART.reduce((accumulator, element)=>{return accumulator + element.quantity}, 0);
    let cartSupDisp = document.querySelector(".js-cart-quantity");
    cartSupDisp.innerHTML = cartQuantityDisp;
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
            Sub-Total: ${(item.productCostCalc / 100).toFixed(2)}
          </p>
           <div class="removeAndAdd">
            <button class="reduceBtn" data-button-id="${
              item.productID
            }">Reduce</button>
            <button class="addBtn" data-button-id="${
              item.productID
            }">Add</button>
            <button class="removeBtn" data-button-id="${
              item.productID
            }">Remove</button>
           </div>
        </div>
      </div>
      `;
      cartCONTAINER.innerHTML += cartHTML;
      let reduceProdBtns = document.querySelectorAll(".reduceBtn");
      let addProdBtns = document.querySelectorAll(".addBtn");
      let removeProdBtns = document.querySelectorAll(".removeBtn");
      removeProdBtns.forEach((removeProdBtn)=>{
        removeProdBtn.addEventListener("click", ()=>{
          let buttonId = Number(removeProdBtn.dataset.buttonId);
          let index = CART.findIndex(obj => obj.productID === buttonId);
          if(index !== -1){
            CART.splice(index, 1)
          }
          localStorage.setItem("cart", JSON.stringify(CART));
          
          
        });
      })
      reduceProdBtns.forEach((reduceProdBtn)=>{
        reduceProdBtn.addEventListener("click", ()=>{
          let buttonId = Number(reduceProdBtn.dataset.buttonId);
          let itemStored = CART.find((product)=>{
            return product.productID === buttonId;
          });
          itemStored.quantity--;
          localStorage.setItem("cart", JSON.stringify(CART));
          
          
        });
      })
      addProdBtns.forEach((addProdBtn)=>{
        addProdBtn.addEventListener("click", ()=>{
          let buttonId = Number(addProdBtn.dataset.buttonId);
          let itemStored = CART.find((product)=>{
            return product.productID === buttonId;
          });
          itemStored.quantity++;
          localStorage.setItem("cart", JSON.stringify(CART));
          
          
        });
      })
    });
    function calculateTotal() {
      let totalCOST = CART.reduce((accumulator, element) => {
        return accumulator + element.productCostCalc;
      }, 0);
      totalCOST = Number((totalCOST / 100).toFixed(2));
      const Tax = 0.1;
      let tWithoutTax = document.querySelector(".tWithoutTax");
      let tWithTax = document.querySelector(".tWithTax");
      tWithoutTax.innerHTML = `$${totalCOST}`;
      let iTax = Number(totalCOST * Tax);
      let totalAfterTax = (totalCOST + iTax).toFixed(2);
      tWithTax.innerHTML = `$${totalAfterTax}`;
    }
    
    calculateTotal();
  }
  document.addEventListener("DOMContentLoaded", renderProds);
}

allAboutCart();

//search products
searchBar.addEventListener("keyup", (e)=>{

  let searchValue = searchBar.value;
  let searchedItem = products.find((product)=>{
    if(product.name.includes(searchValue)){
      return product;
    }
  });

  if(!searchValue || searchValue === ""){
    container.innerHTML = "";
    updateProds();
  }else{
    container.innerHTML = `
    <h1>Ooops..... <br>
    Product not available</h1>
    `;
    let HTMLSearch = `
      <div class="card">
        <div class="image">
          <img src="${searchedItem.source}">
        </div>
        <div class="details">
          <p>${searchedItem.name}</p>
          <p>$${(searchedItem.priceCents / 100).toFixed(2)}</p>
        </div>
        <div class="buttons">
          <button data-product-id="${searchedItem.id}" data-product-name="${
            searchedItem.name
          }" data-product-image="${searchedItem.source}" data-product-pricecents="${
            searchedItem.priceCents
          }">Add to cart</button>
        </div>
      </div>
      `;
    container.innerHTML = HTMLSearch;

  }

  
});