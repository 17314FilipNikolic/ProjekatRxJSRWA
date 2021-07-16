import { map, filter } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";

import { Food } from "../models/food";
import { Ad } from "../models/ad";
import { Drink } from "../models/drink";

import { FoodService } from "./foodService";
import { AdService } from "./adService";
import { DrinkService } from "./drinkService";

import { FoodView } from "../views/foodView";
import { AdView } from "../views/adView";
import { DrinkView } from "../views/drinkView";
import { OrderView } from "../views/orderView";

export class OrderService {
  foodService: FoodService;
  foodView: FoodView;
  adService: AdService;
  adView: AdView;
  drinkService: DrinkService;
  drinkView: DrinkView;
  orderView: OrderView;

  constructor() {
    this.foodService = new FoodService();
    this.foodView = new FoodView();
    this.adService = new AdService();
    this.adView = new AdView();
    this.drinkService = new DrinkService();
    this.drinkView = new DrinkView();
    this.orderView = new OrderView();
  }

  searchForFood(
    food_input: HTMLInputElement,
    ad_input: HTMLInputElement,
    drink_input: HTMLInputElement,
    order_lbl: HTMLLabelElement,
    food_lbl: HTMLLabelElement,
    ad_lbl: HTMLLabelElement,
    drink_lbl: HTMLLabelElement
  ) {
    const food = this.foodService.foodInputObs(food_input, food_lbl);
    food.subscribe((hrana: Food) => this.foodView.showFood(hrana, food_lbl));

    const ad = this.adService.adInputObs(ad_input, ad_lbl);
    ad.subscribe((prilog: Ad) => this.adView.showAd(prilog, ad_lbl));

    const drink = this.drinkService.drinkInputObs(drink_input, drink_lbl);
    drink.subscribe((pice: Drink) => this.drinkView.showDrink(pice, drink_lbl));

    this.sastaviNarudzbinu(food, ad, drink, order_lbl);
  }

  sastaviNarudzbinu(
    food: Observable<Food>,
    ad: Observable<Ad>,
    drink: Observable<Drink>,
    narudzbina_lbl: HTMLLabelElement
  ) {
    combineLatest([food, ad, drink])
      .pipe(
        map(([food, ad, drink]) => [food, ad, drink]),
        filter(([food, ad, drink]) => food !== undefined),
        filter(([food, ad, drink]) => ad !== undefined),
        filter(([food, ad, drink]) => drink !== undefined)
      )
      .subscribe((x) =>
        this.orderView.showOrder(x[0].type, x[1].type, x[2].type, narudzbina_lbl)
      );
  }
}
