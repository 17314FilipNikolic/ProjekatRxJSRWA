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
    label.innerHTML = "Tip pica:";
    label.className = "DrinkTyp";
    div.appendChild(label);

    this.typesOfDrink.forEach((type, index) => {
      const adLabel = document.createElement("label");
      adLabel.className = "adLabel";
      adLabel.innerHTML = `${index + 1}: ${type}`;
      adLabel.htmlFor = `${index}`;
      div.appendChild(adLabel);

      const adCheck = document.createElement("input");
      adCheck.type = "radio";
      adCheck.name = "Drink";
      adCheck.className = "DrinkType";
      adCheck.value = `${type}`;
      adCheck.id = `${index}`;
      div.appendChild(adCheck);

      div.appendChild(document.createElement("br"));
    });

    const btn = document.createElement("button");
    btn.innerHTML = "Ubaci hranu u narudzbinu";
    div.appendChild(btn);

    host.appendChild(div);

    order.createDrinkObservable(btn);
  }
}
