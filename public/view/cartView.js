import { cart } from "../constructors/cart.js";


//Ostukorvi vaate genereerimine
export const displayCartView = () => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Ostukorv</h2>";

  const products = cart.getAllProducts();
  if (products.length === 0) {
    const cartItemElement = document.createElement("p");
    cartItemElement.innerText = "Ostukorv on tühi";
    container.append(cartItemElement);
    return;
  }

  products.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
      <h3>${item.product.name}</h3>
      <p>Hind: $${item.product.price}</p>
      <p>Kogus: ${item.quantity}</p>
    `;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Eemalda";
    removeButton.addEventListener("click", () => {
      cart.removeProduct(item.product.id);
      displayCartView(cart);
    });

    cartItemElement.appendChild(removeButton);
    container.append(cartItemElement);
  });

  const totalPrice = cart.calculateTotal();
  const totalPriceWithoutVAT = cart.calculateTotalWithoutVAT();

  const totalElement = document.createElement("p");
  totalElement.innerHTML = `Kokku: $${totalPrice.toFixed(2)}`;

  const totalPriceWithoutVATElement = document.createElement("p");
  totalPriceWithoutVATElement.innerHTML = `Kokku ilma käibemaksuta: $${totalPriceWithoutVAT.toFixed(2)}`;

  container.appendChild(totalElement);
  container.appendChild(totalPriceWithoutVATElement);
};