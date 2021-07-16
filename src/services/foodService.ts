import { debounceTime, map, filter, switchMap } from "rxjs/operators";
import { Food } from "../models/food";
import { from, fromEvent, Observable } from "rxjs";
import { OrderView } from "../views/orderView";

const API_URL = "http://localhost:3000";

export class FoodService {
  getFoodObservableById(id: number): Observable<Food> {
    return from(
      fetch(`${API_URL}/food/${id}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  getFoodObservableByType(type: String): Observable<Food[]> {
    return from(
      fetch(`${API_URL}/food/?type=${type}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  foodInputObs(input: HTMLInputElement, host: HTMLElement, order: OrderView) {
    return fromEvent(input, "input")
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
      });
  }
}
