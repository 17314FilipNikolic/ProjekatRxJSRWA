import { reduce, map } from "rxjs/operators";
import { of } from "rxjs";
import { Ad } from "./models/ad";
import { Food } from "./models/food";

export class Order{
    food: Food[];
    ads: Ad[];
    priceFood: number;
    priceAd: number;
    reducer = (acc: number, value: number) => acc + value; 
    setFoodOrder(food: Food){
        this.food.push(food);
        this.setPrice();
    }
    setAdOrder(ad: Ad){
        this.ads.push(ad);
        this.setPrice();
    }
    setPrice(){
        of(...this.food).pipe(
            map((food) => food.price),
            reduce((acc, val) => acc + val)
        )
        .subscribe((val) => this.priceFood = val);
        of(...this.ads).pipe(
            map((ad) => ad.price),
            reduce((acc, val) => acc + val)
        )
        .subscribe((val) => this.priceAd = val);
    }
}