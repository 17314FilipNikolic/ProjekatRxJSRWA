import { fromEvent } from "rxjs";
import { Ad } from "../models/ad";
import { Drink } from "../models/drink";
import { Food } from "../models/food";
import { Location } from "../models/location";

export class OrderView {
  food: Food;
  drink: Drink;
  ads: Ad[] = [];
  location: Location;
  priceFood: number;
  priceAd: number;
  priceDrink: number;

  constructor() {
    this.priceFood = this.priceAd = this.priceDrink = 0;
  }

  setFoodOrder(food: Food) {
    this.food = food;
    this.setPrice();
  }
  setDrinkOrder(drink: Drink) {
    this.drink = drink;
    this.setPrice();
  }
  setLocation(location: Location) {
    this.location = location;
  }
  setAdOrder(ad: Ad) {
    this.ads = this.ads.filter((oldAd) => oldAd.id !== ad.id);
    this.ads.push(ad);
    this.setPrice();
  }
  setAdsOrder(ads: Ad[]) {
    ads.forEach((ad) => this.setAdOrder(ad));
  }
  deleteAdOrder(adRemove: Ad) {
    this.ads = this.ads.filter((ad) => ad.id !== adRemove.id);
    this.setPrice();
  }
  deleteAdsOrder(ads: Ad[]) {
    ads.forEach((ad) => this.deleteAdOrder(ad));
  }
  setPrice() {
    this.priceFood = this.food ? this.food.price : 0;
    this.priceDrink = this.drink ? this.drink.price : 0;
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

    this.food && this.showFood(container);

    this.drink && this.showDrink(container);

    this.ads.length > 0 && this.showAds(container);

    const price = document.createElement("div");
    price.innerHTML = `Cena poruzdbine je: ${
      Number.parseInt(this.priceAd.toString()) +
      Number.parseInt(this.priceFood.toString()) +
      Number.parseInt(this.priceDrink.toString())
    }`;
    price.className = "Price";
    container.appendChild(price);

    this.location && this.showLocation(container);

    this.createClearButton(container);
  }

  showFood(host: HTMLElement) {
    const foodtype = document.createElement("div");
    foodtype.innerHTML = `Hrana: ${this.food.type}`;
    foodtype.className = "Food";
    host.appendChild(foodtype);

    const foodcontent = document.createElement("label");
    foodcontent.innerHTML = `Sadrzaj: ${this.food.content}`;
    foodcontent.className = "FoodContent";
    host.appendChild(foodcontent);

    const foodprice = document.createElement("div");
    foodprice.innerHTML = `Cena hrane: ${this.food.price}`;
    foodprice.className = "FoodPrice";
    host.appendChild(foodprice);
  }

  showDrink(host: HTMLElement) {
    const drinktype = document.createElement("div");
    drinktype.innerHTML = `Pice: ${this.drink.type}`;
    drinktype.className = "Drink";
    host.appendChild(drinktype);

    const drinkprice = document.createElement("div");
    drinkprice.innerHTML = `Cena pica: ${this.drink.price}`;
    drinkprice.className = "DrinkPrice";
    host.appendChild(drinkprice);
  }

  showAds(host: HTMLElement){
    this.ads.forEach((ad) => {
      const adtype = document.createElement("div");
      adtype.innerHTML = `Tip priloga: ${ad.type}`;
      adtype.className = "Ad";
      host.appendChild(adtype);

      const adprice = document.createElement("div");
      adprice.innerHTML = `Cena priloga: ${ad.price}`;
      adprice.className = "AdPrice";
      host.appendChild(adprice);
    });
  }

  showLocation(host: HTMLElement){
    const loc  = document.createElement("div");
    loc.innerHTML = `Vasa lokacija je: ${this.location.location}`;
    loc.className = "Location";
    host.appendChild(loc);

    const loctime = document.createElement("div");
    loctime.innerHTML = `Ocekivano vreme za stizanje narudzbine: ${this.location.time}`;
    loctime.className = "LocationTime";
    host.appendChild(loctime);
  }

  createClearButton(host: HTMLElement){
    const btn = document.createElement("button");
    btn.innerHTML = "Naruci";
    btn.className = "btnOrder";
    host.appendChild(btn);

    fromEvent(btn, "click").subscribe(() => this.clearOrder());
  }

  clearOrder() {
    this.food = null;
    this.drink = null;
    this.location = null;
    this.ads = [];
    this.priceAd = this.priceFood = this.priceDrink = 0;
  }
}
