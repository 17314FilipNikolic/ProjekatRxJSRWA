import { DrinkService } from "../services/drinkService";
import { OrderView } from "./orderView";

export class DrinkView {
  typesOfDrink = ["coca-cola", "fanta", "sprite", "voda"];
  drinkService: DrinkService;

  constructor(){
    this.drinkService = new DrinkService();
  }

  createDrinkCheckElement(host: HTMLElement, order: OrderView) {
    let option = null;
    let div = document.createElement("div");
    div.className = "DrinkContainer";
    const label = document.createElement("div");
    label.innerHTML = "Tip pica:";
    label.className = "DrinkTyp";
    div.appendChild(label);

    for (let i = 0; i < this.typesOfDrink.length; i++) {
      option = document.createElement("div");
      option.innerHTML = `${i + 1}: ${this.typesOfDrink[i]}`;
      option.className = "DrinkType";
      div.appendChild(option);
    }

    const input = document.createElement("input");
    input.className = "DrinkInput";
    div.appendChild(input);

    host.appendChild(div);

    this.drinkService.drinkInputObs(input, host, order);
  }
}
