import { FoodService } from "../services/foodService";
import { OrderService } from "../services/orderService";

export class FoodView {
  typesOfFood = ["Sendvic", "Pica", "Gurmanska pljeskavica", "Pasta"];
  foodService: FoodService;

  constructor() {
    this.foodService = new FoodService();
  }

  createFoodCheckElement(host: HTMLElement, order: OrderService) {
    let div = document.createElement("div");
    div.className = "FoodContainer";
    const label = document.createElement("div");
    label.innerHTML = "Izaberite tip hrane:";
    label.className = "FoodTyp";
    div.appendChild(label);

    this.typesOfFood.forEach((type, index) => {
      const foodRadio = document.createElement("input");
      foodRadio.type = "radio";
      foodRadio.name = "Food";
      foodRadio.className = "FoodType";
      foodRadio.value = `${type}`;
      foodRadio.id = `${index}`;
      div.appendChild(foodRadio);

      const foodLabel = document.createElement("label");
      foodLabel.className = "adLabel";
      foodLabel.innerHTML = `${index + 1}: ${type}`;
      foodLabel.htmlFor = `${index}`;
      div.appendChild(foodLabel);

      div.appendChild(document.createElement("br"));
    });

    const btn = document.createElement("button");
    btn.innerHTML = "Naruci hranu";
    div.appendChild(btn);

    host.appendChild(div);

    order.createFoodObservable(btn);
  }
}
