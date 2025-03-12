import { getProductById } from "../api.js";



export const dispalyProductDetailView = async (productId) => {
  const product = await getProductById(productId)
    const container = document.getElementById("main-container");
    container.innerHTML = "";
  
    const productCard = document.createElement("div");
    productCard.classList.add("product");
  
    productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>Kategooria: ${product.category}</p>
        <p>Hind: $${product.price}</p>
        <p>Kirjeldus: $${product.description}</p>
        <img src="${product.image}" alt="${product.title}" style="width: 200px; height: auto;">
        
      `;
  
    container.append(productCard);
  };