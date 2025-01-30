// main.js impordin product.js, cart.js, customer.js
import { Product } from './constructors/product.js';
import { Cart } from './constructors/cart.js';
import { Customer } from './constructors/customer.js';
import { Order } from './constructors/order.js'; // Vajadusel import Order
import { displayAllProductsView } from "./view/allProductsView.js";
import { displayCartView } from './view/cartView.js';
import { displayFavoritesView } from './view/favoritesView.js';
import { dispalyProductDetailView } from './view/productDetailView.js';
import { navigate } from './router.js';
import { getProductsDataFromJson } from "./api.js"
import { getAllCategory } from './api.js';
import { fetchProducts, getProductsByCategory } from './api.js';


let favorites = [];
/* Loo ostukorv ja lisa tooted
const cart = new Cart();
cart.addProduct(laptop, 1);
cart.addProduct(phone, 2);

// Kuvage ostukorvi kogusumma ja toodete arv
console.log('Kogusumma:', cart.calculateTotal().toFixed(2));
console.log('Kokku tooteid ostukorvis:', cart.totalItems);

// Loo klient ja esita tellimus
const customer = new Customer('Alice');
customer.placeOrder(cart);

// Kuvage tellimuste ajalugu
customer.printOrderHistory();
const order = new Order(cart);
*/

        
/*const mainContainer = document.getElementById("container");
console.log(mainContainer);

products.forEach(element => {
    
console.log(element.id);
});
function dispalyProducts(){
    const productsContainer = document.getElementById("products");

    products.forEach((Product) => {
        const productCard = document.createElement("div");

        const ProductTitle = document.createElement("h3");
        productCard.append(ProductTitle);
        
        productsContainer.append(productCard);
    })
};*/
//const favourites = [] 

const initApp = async () => {
  
   // const productsData = await getProductsDataFromJson();
    //const products = productsData.map(
    //  (item) => new Product(item.id, item.title, item.price, item.category)
   // );

    console.log(products)
    const homeButton = document.getElementById("home-button");
    homeButton.onclick = () => navigate("allProducts", categories[0]);
  
    const favoritesButton = document.getElementById("fav-button");
    favoritesButton.onclick = () => navigate("favorites", favorites);
  
    const cartButton = document.getElementById("cart-button");
    cartButton.onclick = () => navigate("cart", cart);

    const categories = await getAllCategory();
    const categoryMenu = document.getElementById("categories");
    
    categories.forEach((category) => {
      const categoryElement = document.createElement("li");
     categoryElement.textContent = category;
     categoryElement.onclick = () => navigate("allProducts", category);

     categoryMenu.appendChild(categoryElement);
     
   });
  
    displayAllProductsView(products);

    
  };
  
  document.addEventListener("DOMContentLoaded", initApp);
  export const cart = new Cart();
  /*
const favButton = document.getElementById ("fav-button")
 favButton.onclick= () => navigate('favorites', favourites )


 const cartButton = document.getElementById ("cart-button")
 cartButton.onclick= () => navigate('cart' , cart)*/

