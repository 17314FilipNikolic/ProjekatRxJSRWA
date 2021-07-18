import { merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Ad } from "../models/ad";
import { Drink } from "../models/drink";
import { Food } from "../models/food";
import { OrderView } from "../views/orderView";
import { AdService } from "./adService";
import { DrinkService } from "./drinkService";
import { FoodService } from "./foodService";

export class OrderService {
  foodObservable: Observable<Food>;
  adObservable: Observable<Ad[]>;
  drinkObservable: Observable<Drink>;
  foodService: FoodService;
  adService: AdService;
  drinkService: DrinkService;

  constructor() {
    this.foodService = new FoodService();
    this.adService = new AdService();
    this.drinkService = new DrinkService();
  }

  createFoodObservable(btn: HTMLButtonElement) {
    this.foodObservable = this.foodService.handleButtonClick(btn);
  }

  createDrinkObservable(btn: HTMLButtonElement) {
    this.drinkObservable = this.drinkService.handleButtonClick(btn);
  }

  createAdObservable(btn: HTMLButtonElement) {
    this.adObservable = this.adService.handleButtonClick(btn);
  }

  makeOrder(order: OrderView, host: HTMLElement) {
    merge(
      this.foodObservable.pipe(map((food) => order.setFoodOrder(food))),
      this.drinkObservable.pipe(map((drink) => order.setDrinkOrder(drink))),
      this.adObservable.pipe(map((ads) => order.setAdsOrder(ads)))
    ).subscribe(() => order.showOrder(host));
  }
}
