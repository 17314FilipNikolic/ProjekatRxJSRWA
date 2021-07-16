import { Drink } from "../models/drink";

export class DrinkView {
  showDrink(drink: Drink, drink_lbl: HTMLLabelElement) {
    if (drink === undefined) {
      drink_lbl.innerHTML = "greska";
    } else {
      drink_lbl.innerHTML = `${drink["type"]} ${drink.price}RSD`;
      console.log(drink);
    }
  }
}
