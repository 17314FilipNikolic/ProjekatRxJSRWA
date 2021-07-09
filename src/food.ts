import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";
import { Food }  from "./models/food";
import { Order } from "./order";

const API_URL = "http://localhost:3000";

export class FoodClass{
    typesOfFood = ["Sendvic", "Pica", "Gurmanska Pljeskavica", "Pasta"];
    getFoodObservableById(id: number): Observable<Food>{
        return from(
            fetch(`${API_URL}/food/${id}`)
              .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("fetch error");
              })
              .catch((er) => console.log(er))
          );
    }
    getFoodObservableByType(type: String): Observable<Food[]>{
        return from(
            fetch(`${API_URL}/food/?type=${type}`)
              .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("fetch error");
              })
              .catch((er) => console.log(er))
          );
    }
    createFoodCheckElement(host: HTMLElement, order: Order){
        let option = null;
        let div = document.createElement("div");
        const label = document.createElement("label");
        label.innerHTML = "Tip hrane";
        div.appendChild(label);

        for (let i = 0; i < this.typesOfFood.length; i++) {
            option = document.createElement("label");
            option.innerHTML = `${this.typesOfFood[i]}`;
            option.className = "Type";
            div.appendChild(option);
        }
        host.appendChild(div);

        const input = document.createElement("input");
        host.appendChild(input);

        fromEvent(input, "input")
        .pipe(
            debounceTime(1000),
            map((ev: Event) => (<HTMLInputElement>ev.target).value),
            filter((text) => text.length > 3),
            switchMap((type) => this.getFoodObservableByType(type)),
            map((food) => food[0])
        )
        .subscribe((food) => {
            order.setFoodOrder(food);
            order.showOrder(host);
            console.log(food);
            console.log(food.id, food.type, food.price, food.content);
        });
    }
}