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

    // Muuda URL-i ilma lehte uuesti laadimata
    /*
    const encodedParam = encodeURIComponent(param);
    const newUrl =
      view === "category" && !param ? "/" : `/${view}/${encodedParam || ""}`;
    window.history.pushState({}, "", newUrl);*/
  }
  
};

// Sündmuse listener, kui kasutaja vajutab "tagasi" või "edasi" nuppu brauseris
window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  const [_, view, param] = path.split("/");
  const decodedParam = decodeURIComponent(param);
  navigate(view || "category", decodedParam);
});


