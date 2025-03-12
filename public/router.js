import { displayFavoritesView } from "./view/favoritesView.js";
import { dispalyProductDetailView } from "./view/productDetailView.js";
import { displayCartView } from "./view/cartView.js";
import { displayAllProductsView } from "./view/allProductsView.js";

export const navigate = (view, param) => {
  const views = {
    allProducts: () => displayAllProductsView(param || "all"), // Kasuta vaikeväärtust "all" kategooriana
    productDetail: () => dispalyProductDetailView(param), // üks toode
    cart: () => displayCartView(param), // Näita ostukorvi vaadet
    favorites: () => displayFavoritesView(), //näidata lemmikute

  };

  //Vali ja käivita sobiv vaade
  if (views[view]) {
    views[view]();


  }
  
};



