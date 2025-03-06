let searchBar = document.getElementById("search");
let searchLabel = document.querySelector(".searchLabel");

searchLabel.addEventListener("click", ()=>{
  searchBar.classList.remove("displayNone");
})
