import { FoodService } from "../services/foodService";
import { OrderView } from "./orderView";

export class FoodView {
  typesOfFood = ["Sendvic", "Pica", "Gurmanska pljeskavica", "Pasta"];
  foodService: FoodService;

  constructor(){
    this.foodService = new FoodService();
  }

  createFoodCheckElement(host: HTMLElement, order: OrderView) {
    let option = null;
    let div = document.createElement("div");
    div.className = "FoodContainer";
    const label = document.createElement("div");
    label.innerHTML = "Tip hrane:";
    label.className = "FoodTyp";
    div.appendChild(label);

    for (let i = 0; i < this.typesOfFood.length; i++) {
      option = document.createElement("div");
      option.innerHTML = `${i + 1}: ${this.typesOfFood[i]}`;
      option.className = "FoodType";
      div.appendChild(option);
    }

    const input = document.createElement("input");
    input.className = "FoodInput";
    div.appendChild(input);

    host.appendChild(div);

    this.foodService.foodInputObs(input, host, order);
  }
}
