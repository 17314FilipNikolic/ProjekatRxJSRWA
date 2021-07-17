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
      option = document.createElement("div");
      option.innerHTML = `${index + 1}: ${type}`;
      option.className = "FoodType";
      div.appendChild(option);
    });

    const inputLbl = document.createElement("label");
    inputLbl.className = "FoodInputLbl";
    inputLbl.innerHTML = "Unesite hranu koju zelite da narucite:";
    div.appendChild(inputLbl);

    const input = document.createElement("input");
    input.className = "FoodInput";
    div.appendChild(input);

    host.appendChild(div);

    order.createFoodObservable(input);
  }
}
