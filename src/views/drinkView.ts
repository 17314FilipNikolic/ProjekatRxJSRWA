import { DrinkService } from "../services/drinkService";
import { OrderService } from "../services/orderService";
import { OrderView } from "./orderView";

export class DrinkView {
  typesOfDrink = ["coca-cola", "fanta", "sprite", "voda"];
  drinkService: DrinkService;
  orderService: OrderService;

  constructor() {
    this.drinkService = new DrinkService();
    this.orderService = new OrderService();
  }

  createDrinkCheckElement(host: HTMLElement, order: OrderService) {
    let div = document.createElement("div");
    div.className = "DrinkContainer";
    const label = document.createElement("div");
    label.innerHTML = "Tip pica:";
    label.className = "DrinkTyp";
    div.appendChild(label);

    this.typesOfDrink.forEach((type, index) => {
      const drinkLabel = document.createElement("label");
      drinkLabel.className = "adLabel";
      drinkLabel.innerHTML = `${index + 1}: ${type}`;
      div.appendChild(drinkLabel);

      div.appendChild(document.createElement("br"));
    });

    const inputLbl = document.createElement("label");
    inputLbl.className = "DrinkInputLbl";
    inputLbl.innerHTML = "Unesite pice koje zelite da narucite:";
    div.appendChild(inputLbl);

    const input = document.createElement("input");
    input.className = "DrinkInput";
    div.appendChild(input);

    host.appendChild(div);

    order.createDrinkObservable(input);
  }
}
