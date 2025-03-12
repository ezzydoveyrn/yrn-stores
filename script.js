let searchBar = document.getElementById("search");
let searchLabel = document.querySelector(".searchLabel");

searchLabel.addEventListener("click", ()=>{
  searchBar.classList.toggle("displayNone");
})
searchBar.onmouseleave = () => {
  searchBar.classList.toggle("displayNone");
};


// cart management
let openCloseCart = document.querySelector(".openCloseCart");
let openClose = document.querySelector(".openClose");
const prodCart = document.querySelector(".crt");

openCloseCart.addEventListener("click", ()=>{
  prodCart.classList.toggle("displayNone")
});
openCloseCart.addEventListener("mouseover", ()=> {
  openCloseCart.title ="Close";
})
openClose.addEventListener("click", ()=>{
  prodCart.classList.toggle("displayNone");
});