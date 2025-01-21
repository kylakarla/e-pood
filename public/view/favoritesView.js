import { customerConstructor } from "../constructors/customer.js";


export const displayFavoritesView = () => {
  const mainContainer = document.getElementById("main-container");
  const favourites = customerConstructor.getAllFavorites(); // Fixed method name to getAllFavorites

  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmikud</h2>";

  // Check if favourites array is empty or undefined
  if (!favourites || favourites.length === 0) {  // Fixed typo: "lenght" to "length"
     const noFavouritesMessage = document.createElement("p");
     noFavouritesMessage.innerText = "Sul ei ole lemmikuid";
     container.appendChild(noFavouritesMessage);
     return;
  }

  // Loop through each favourite item
  favourites.forEach((item) => {
     const favoriteItemElement = document.createElement("div");
     favoriteItemElement.classList.add("favorite-item");

     favoriteItemElement.innerHTML = `
         <h3>${item.product.name}</h3>
         <p>Hind: $${item.product.price}</p>
     `;

     // Create and append the remove button
     const removeButton = document.createElement("button");
     removeButton.textContent = "Eemalda";
     removeButton.addEventListener("click", () => {
        customerConstructor.toggleFavorites(item.product); // Fixed method name to toggleFavorites
        displayFavoritesView(); // Refresh the view after removal
     });
     favoriteItemElement.appendChild(removeButton);

     container.appendChild(favoriteItemElement);
  });
};
