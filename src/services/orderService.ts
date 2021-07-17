import { combineLatest, fromEvent, merge, Observable } from "rxjs";
import { filter, map, mapTo, switchMap } from "rxjs/operators";
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

  createFoodObservable(input: HTMLInputElement) {
    this.foodObservable = this.foodService.foodInputObs(input);
  }

  createDrinkObservable(input: HTMLInputElement) {
    this.drinkObservable = this.drinkService.drinkInputObs(input);
  }

  createAdObservable(btn: HTMLButtonElement, div: HTMLDivElement) {
    this.adObservable = this.adService.handleButtonClick(btn, div);
  }

  makeOrder(order: OrderView, host: HTMLElement) {
    merge(
      this.foodObservable.pipe(map((food) => order.setFoodOrder(food))),
      this.drinkObservable.pipe(map((drink) => order.setDrinkOrder(drink))),
      this.adObservable.pipe(map((ads) => order.setAdsOrder(ads)))
    ).subscribe(() => order.showOrder(host));
  }
}
