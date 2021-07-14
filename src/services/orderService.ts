import { map, filter } from "rxjs/operators";
import { combineLatest, Observable } from "rxjs";

import { Food } from "../models/food";
import { Ad } from "../models/ad";
import { Drink } from "../models/drink";

import { foodInputObs } from "./foodService";
import { adInputObs } from "./adService";
import { drinkInputObs } from "./drinkService";

import { showFood } from "../views/foodView";
import { showAd } from "../views/adView";
import { showDrink } from "../views/drinkView";
import { showOrder } from "../views/orderView";

export function searchForFood(
  food_input: HTMLInputElement,
  ad_input: HTMLInputElement,
  drink_input: HTMLInputElement,
  order_lbl: HTMLLabelElement,
  food_lbl: HTMLLabelElement,
  ad_lbl: HTMLLabelElement,
  drink_lbl: HTMLLabelElement
) {
  const food = foodInputObs(food_input, food_lbl);
  food.subscribe((hrana: Food) => showFood(hrana, food_lbl));

  const ad = adInputObs(ad_input, ad_lbl);
  ad.subscribe((prilog: Ad) => showAd(prilog, ad_lbl));

  const drink = drinkInputObs(drink_input, drink_lbl);
  drink.subscribe((pice: Drink) => showDrink(pice, drink_lbl));

  sastaviNarudzbinu(food, ad, drink, order_lbl);
}

function sastaviNarudzbinu(
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
      showOrder(x[0].type, x[1].type, x[2].type, narudzbina_lbl)
    );
}
