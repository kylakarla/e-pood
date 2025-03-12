// main.js impordin product.js, cart.js, customer.js
import { displayAllProductsView } from "./view/allProductsView.js";
import { navigate } from './router.js';
import { getAllCategory } from './api.js';


const initApp = async () => {
  

    const homeButton = document.getElementById("home-button");
    homeButton.onclick = () => navigate("allProducts", categories[0]);
  
    const favoritesButton = document.getElementById("fav-button");
    favoritesButton.onclick = () => navigate("favorites");
  
    const cartButton = document.getElementById("cart-button");
    cartButton.onclick = () => navigate("cart");

    const categories = await getAllCategory();
    const categoryMenu = document.getElementById("categories");
    
    categories.forEach((category) => {
      const categoryElement = document.createElement("li");
     categoryElement.textContent = category;
     categoryElement.onclick = () => navigate("allProducts", category);

     categoryMenu.appendChild(categoryElement);
     
   });
  
    displayAllProductsView();

    
  };
  
  document.addEventListener("DOMContentLoaded", initApp);


