import { Order } from "./order.js";


export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
  }

  placeOrder(cart) {
    const order = new Order(cart);
    this.orderHistory.push(order);
  }
  printOrderHistory() {
    console.log(`${this.name} tellimuste ajalugu:`);
    this.orderHistory.forEach((order, index) => {
        console.log(`Tellimus ${index + 1}:`);
        console.log(`Kuupäev: ${order.orderDate.toLocaleString()}`);
        console.log(`Kogusumma: ${order.cart.calculateTotal().toFixed(2)} €`);
        console.log('---');
    });
  }



  toggleFavorites(product) {
    const existingItem = this.favorites.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      this.favorites = this.favorites.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      this.favorites.push({ product });
    }
    console.log("Kõik lemikud ", this.favorites);
  }

  isFavorite(productId) {
    const existingItem = this.favorites.find(
      (item) => item.product.id === productId
    );
    return !!existingItem;
  }

  // Kõik lemmikud tagastatakse
  getAllFavorites() {
    return this.favorites;
  }
}


export const customerConstructor = new Customer("Karl");
