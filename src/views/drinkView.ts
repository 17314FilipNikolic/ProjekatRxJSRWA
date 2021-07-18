import { DrinkService } from "../services/drinkService";
import { OrderService } from "../services/orderService";

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
    label.innerHTML = "Izaberite tip pica:";
    label.className = "DrinkTyp";
    div.appendChild(label);

    this.typesOfDrink.forEach((type, index) => {
      const drinkRadio = document.createElement("input");
      drinkRadio.type = "radio";
      drinkRadio.name = "Drink";
      drinkRadio.className = "DrinkType";
      drinkRadio.value = `${type}`;
      drinkRadio.id = `${index}`;
      div.appendChild(drinkRadio);
      
      const drinkLabel = document.createElement("label");
      drinkLabel.className = "adLabel";
      drinkLabel.innerHTML = `${index + 1}: ${type}`;
      drinkLabel.htmlFor = `${index}`;
      div.appendChild(drinkLabel);

      div.appendChild(document.createElement("br"));
    });

    const btn = document.createElement("button");
    btn.innerHTML = "Naruci pice";
    div.appendChild(btn);

    host.appendChild(div);

    order.createDrinkObservable(btn);
  }
}
