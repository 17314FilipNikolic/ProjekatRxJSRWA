import { merge, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Ad } from "../models/ad";
import { Drink } from "../models/drink";
import { Food } from "../models/food";
import { Location } from "../models/location";
import { OrderView } from "../views/orderView";
import { AdService } from "./adService";
import { DrinkService } from "./drinkService";
import { FoodService } from "./foodService";
import { LocationService } from "./locationService";

export class OrderService {
  foodObservable: Observable<Food>;
  adObservable: Observable<Ad[]>;
  adRemoveObservable: Observable<Ad[]>;
  drinkObservable: Observable<Drink>;
  locationObservable: Observable<Location>;
  foodService: FoodService;
  adService: AdService;
  drinkService: DrinkService;
  locationService: LocationService;

  constructor() {
    this.foodService = new FoodService();
    this.adService = new AdService();
    this.drinkService = new DrinkService();
    this.locationService = new LocationService();
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

  createAdRemoveObservable(btn: HTMLButtonElement) {
    this.adRemoveObservable = this.adService.handleButtonRemoveClick(btn);
  }

  createLocationObservable(input: HTMLInputElement) {
    this.locationObservable = this.locationService.handleInputLocation(input);
  }

  makeOrder(order: OrderView, host: HTMLElement) {
    merge(
      this.foodObservable.pipe(map((food) => order.setFoodOrder(food))),
      this.drinkObservable.pipe(map((drink) => order.setDrinkOrder(drink))),
      this.adObservable.pipe(map((ads) => order.setAdsOrder(ads))),
      this.adRemoveObservable.pipe(map((ads) => order.deleteAdsOrder(ads))),
      this.locationObservable.pipe(map((location) => order.setLocation(location)))
    ).subscribe(() => order.showOrder(host));
  }
}
