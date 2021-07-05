import { reduce, map } from "rxjs/operators";
import { fromEvent, of } from "rxjs";
import { Ad } from "./models/ad";
import { Food } from "./models/food";
import { FoodCl } from "./classes/food";

export class Order{
    food: FoodCl;
    ads: Ad[] = [];
    priceFood: number;
    priceAd: number;
    price: number;
    reducer = (acc: number, value: number) => acc + value; 
    setFoodOrder(newfood: Food){
        this.food = new FoodCl(newfood.id, newfood.type, newfood.price, newfood.content);
        this.setPrice();
    }
    setAdOrder(ad: Ad){
        this.ads.push(ad);
        this.ads[this.ads.length - 1].id = ad.id;
        this.ads[this.ads.length - 1].price = ad.price;
        this.ads[this.ads.length - 1].type = ad.type;
        this.setPrice();
    }
    setPrice(){
        this.priceFood = this.food.price ?? 0;
        this.ads ? of(...this.ads).pipe(
            map((ad) => ad.price),
            reduce((acc, val) => acc + val)
        )
        .subscribe((val) => this.priceAd = val)
        : this.priceAd = 0;
    }
    showOrder(host: HTMLElement){
        const previousOrder = host.getElementsByClassName("Order");
        var array = Array.from(previousOrder);
        array.forEach((element) => {
            host.removeChild(element);
        });
        const container = document.createElement("div");
        container.className = "Order";
        host.appendChild(container);

        const title = document.createElement("label");
        title.innerHTML = "Vasa narudzbina je:";
        title.className = "Title";
        container.appendChild(title);

        const foodtype = document.createElement("label");
        foodtype.innerHTML = `${this.food.type ? this.food.type : ""}`;
        foodtype.className = "Food";
        container.appendChild(foodtype);

        const foodcontent = document.createElement("label");
        foodcontent.innerHTML = `Sadrzaj: ${this.food.content && this.food.content}`;
        foodcontent.className = "Food";
        container.appendChild(foodcontent);

        const foodprice = document.createElement("label");
        foodprice.innerHTML = `Cena: ${this.food?.price}`;
        foodprice.className = "Food";
        container.appendChild(foodprice);

        this.ads?.forEach((ad) => {
            const adtype = document.createElement("label");
            adtype.innerHTML = `Tip dodatka: ${ad?.type}`;
            adtype.className = "Ad";
            container.appendChild(adtype);

            const adprice = document.createElement("label");
            adprice.innerHTML = `Cena dodatka: ${ad?.price}`;
            adprice.className = "Ad";
            container.appendChild(adprice);
        });

        const price = document.createElement("label");
        price.innerHTML = `Cena poruzdbine je: ${this.priceFood + this.priceAd}`;
        price.className = "Price";
        container.appendChild(price);

        const btn = document.createElement("button");
        btn.innerHTML = "Naruci";
        btn.className = "btnOrder";
        container.appendChild(btn);

        fromEvent(btn, "click")
        .subscribe(() => this.clearOrder());
    }
    clearOrder(){
        this.food = null;
        this.ads = [];
    }
}