import { Food } from "../models/food";

export function showFood(food: Food, food_lbl: HTMLLabelElement) {
  if (food === undefined) {
    food_lbl.innerHTML = "greska";
  } else {
    food_lbl.innerHTML = `${food["type"]} ${food.price}RSD`;
    console.log(food);
  }
}
