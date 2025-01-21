
export class Product {
    constructor(id, name, price, category, description, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.category = category;
      this.description = description;
      this.image = image;
    }
  
    describe() {
      return `${this.name} - ${this.category} - $${this.price}`;
    }
  
    // staatiline meetod allahindlus hinna arvutamiseks
    static discountedPrice(price, discountPercentage) {
      return price - (price * (discountPercentage / 100));
  }
}