import { Drink } from "../models/drink";

export function showDrink(drink: Drink, drink_lbl: HTMLLabelElement) {
  if (drink === undefined) {
    drink_lbl.innerHTML = "greska";
  } else {
    drink_lbl.innerHTML = `${drink["type"]} ${drink.price}RSD`;
    console.log(drink);
  }
}
