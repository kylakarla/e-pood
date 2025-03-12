import { customerConstructor } from "../constructors/customer.js";
import { navigate } from "../router.js";
import { cart } from "../constructors/cart.js";
import { fetchProducts, getProductsByCategory } from "../api.js"



export const displayAllProductsView = async (category) => {
  const products = await (!category ? fetchProducts() : getProductsByCategory(category))
  


  
    const container = document.getElementById("main-container");
    
    container.innerHTML = "<h2>Tooted</h2>";
  
    const productsContainer = document.createElement("div");
    //productsContainer.classList.add("");
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product");
      productCard.innerHTML = `
          <h3>${product.name}</h3>
          <p>Kategooria: ${product.category}</p>
          <p>Hind: $${product.price}</p>
          <button id="addToFavorites">♡</button>
          <button id="addToCart">Lisa ostukorvi</button>
        `;

        const addToCart = productCard.querySelector("#addToCart")
        addToCart.onclick = (e) => {
          e.stopPropagation();
          cart.addProduct (product)
        }

        const addToFavorites = productCard.querySelector("#addToFavorites");
        addToFavorites.onclick = (e) => {
            e.stopPropagation();
            customerConstructor.toggleFavorites(product)
        };

        
  
      // toote kaardile vajutades mine toode detaisesse vaatesse
      productCard.onclick = (e) => {
        e.stopPropagation();
        navigate("productDetail", product.id);
      };
  
      //ühe toote kaardi lisan toodete konteinerisse
      productsContainer.append(productCard);
    });
  
    // Tooted lisan main kontainersisse
    container.append(productsContainer);
  };