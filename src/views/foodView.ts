import { FoodService } from "../services/foodService";
import { OrderService } from "../services/orderService";

export class FoodView {
  typesOfFood = ["Sendvic", "Pica", "Gurmanska pljeskavica", "Pasta"];
  foodService: FoodService;

  constructor() {
    this.foodService = new FoodService();
  }

  createFoodCheckElement(host: HTMLElement, order: OrderService) {
    let option = null;
    let div = document.createElement("div");
    div.className = "FoodContainer";
    const label = document.createElement("div");
    label.innerHTML = "Tip hrane:";
    label.className = "FoodTyp";
    div.appendChild(label);

    this.typesOfFood.forEach((type, index) => {
      const adLabel = document.createElement("label");
      adLabel.className = "adLabel";
      adLabel.innerHTML = `${index + 1}: ${type}`;
      adLabel.htmlFor = `${index}`;
      div.appendChild(adLabel);

      const adCheck = document.createElement("input");
      adCheck.type = "radio";
      adCheck.name = "Food";
      adCheck.className = "FoodType";
      adCheck.value = `${type}`;
      adCheck.id = `${index}`;
      div.appendChild(adCheck);

      div.appendChild(document.createElement("br"));
    });

    const btn = document.createElement("button");
    btn.innerHTML = "Ubaci hranu u narudzbinu";
    div.appendChild(btn);

    host.appendChild(div);

    order.createFoodObservable(btn);
  }
}
