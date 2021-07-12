import { fromEvent } from "rxjs";
import { Ad } from "./models/ad";
import { Food } from "./models/food";

export class Order {
  food: Food;
  ads: Ad[] = [];
  priceFood: number;
  priceAd: number;
  price: number;
  setFoodOrder(food: Food) {
    this.food = food;
    this.setPrice();
  }
  setAdOrder(ad: Ad) {
    this.ads.push(ad);
    this.setPrice();
  }
  deleteAdOrder(adRemove: Ad) {
    this.ads = this.ads.filter((ad) => ad.id !== adRemove.id);
    this.setPrice();
  }
  setPrice() {
    this.priceFood = this.food.price ?? 0;
    this.priceAd = 0;
    this.ads.length > 0
      ? this.ads.forEach(
          (ad) =>
            (this.priceAd =
              Number.parseInt(this.priceAd.toString()) +
              Number.parseInt(ad.price.toString()))
        )
      : (this.priceAd = 0);
  }
  showOrder(host: HTMLElement) {
    const previousOrder = host.getElementsByClassName("Order");
    var array = Array.from(previousOrder);
    array.forEach((element) => {
      host.removeChild(element);
    });
    const container = document.createElement("div");
    container.className = "Order";
    host.appendChild(container);

    const title = document.createElement("div");
    title.innerHTML = "Vasa narudzbina je:";
    title.className = "Title";
    container.appendChild(title);

    const foodtype = document.createElement("div");
    foodtype.innerHTML = `${this.food.type ? this.food.type : ""}`;
    foodtype.className = "Food";
    container.appendChild(foodtype);

    const foodcontent = document.createElement("label");
    foodcontent.innerHTML = `Sadrzaj: ${
      this.food.content && this.food.content
    }`;
    foodcontent.className = "FoodContent";
    container.appendChild(foodcontent);

    const foodprice = document.createElement("div");
    foodprice.innerHTML = `Cena hrane: ${this.food?.price}`;
    foodprice.className = "FoodPrice";
    container.appendChild(foodprice);

    this.ads.length > 0 &&
      this.ads.forEach((ad) => {
        const adtype = document.createElement("div");
        adtype.innerHTML = `Tip dodatka: ${ad.type}`;
        adtype.className = "Ad";
        container.appendChild(adtype);

        const adprice = document.createElement("div");
        adprice.innerHTML = `Cena dodatka: ${ad.price}`;
        adprice.className = "AdPrice";
        container.appendChild(adprice);
      });

    const price = document.createElement("div");
    price.innerHTML = `Cena poruzdbine je: ${
      Number.parseInt(this.priceAd.toString()) +
      Number.parseInt(this.priceFood.toString())
    }`;
    price.className = "Price";
    container.appendChild(price);

    const btn = document.createElement("button");
    btn.innerHTML = "Naruci";
    btn.className = "btnOrder";
    container.appendChild(btn);

    fromEvent(btn, "click").subscribe(() => this.clearOrder());
  }
  clearOrder() {
    this.food = null;
    this.ads = [];
    this.priceAd = this.priceFood = 0;
  }
}
