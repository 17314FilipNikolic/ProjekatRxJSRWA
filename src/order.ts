import { reduce, map } from "rxjs/operators";
import { of } from "rxjs";
import { Ad } from "./models/ad";
import { Food } from "./models/food";

export class Order{
    food: Food;
    ads: Ad[];
    priceFood: number;
    priceAd: number;
    reducer = (acc: number, value: number) => acc + value; 
    setFoodOrder(food: Food){
        this.food = food;
        this.setPrice();
    }
    setAdOrder(ad: Ad){
        this.ads.push(ad);
        this.setPrice();
    }
    setPrice(){
        this.priceFood = this.food.price;
        of(...this.ads).pipe(
            map((ad) => ad.price),
            reduce((acc, val) => acc + val)
        )
        .subscribe((val) => this.priceAd = val);
    }
    showOrder(host: HTMLElement){
        const container = document.createElement("div");
        container.className = "Order";
        host.appendChild(container);

        const title = document.createElement("label");
        title.innerHTML = "Vasa narudzbina je:";
        title.className = "Title";
        container.appendChild(title);

        const foodtype = document.createElement("label");
        foodtype.innerHTML = `${this.food.type}`;
        foodtype.className = "Food";
        container.appendChild(foodtype);

        const foodcontent = document.createElement("label");
        foodcontent.innerHTML = `Sadrzaj: ${this.food.content}`;
        foodcontent.className = "Food";
        container.appendChild(foodcontent);

        const foodprice = document.createElement("label");
        foodprice.innerHTML = `Cena: ${this.food.price}`;
        foodprice.className = "Food";
        container.appendChild(foodprice);

        this.ads.forEach((ad) => {
            const adtype = document.createElement("label");
            adtype.innerHTML = `Tip dodatka: ${ad.type}`;
            adtype.className = "Ad";
            container.appendChild(adtype);

            const adprice = document.createElement("label");
            adprice.innerHTML = `Cena dodatka: ${ad.price}`;
            adprice.className = "Ad";
            container.appendChild(adprice);
        });

        const price = document.createElement("label");
        price.innerHTML = `Cena poruzdbine je: ${this.priceFood + this.priceAd}`;
        price.className = "Price";
        container.appendChild(price);
    }
}