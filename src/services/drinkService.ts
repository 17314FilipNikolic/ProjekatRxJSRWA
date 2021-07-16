import { debounceTime, map, filter, switchMap } from "rxjs/operators";
import { Drink } from "../models/drink";
import { from, fromEvent, Observable } from "rxjs";
import { OrderView } from "../views/orderView";

const API_URL = "http://localhost:3000";

export class DrinkService {
  getDrinkObservableById(id: number): Observable<Drink> {
    return from(
      fetch(`${API_URL}/drink/${id}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  getDrinkObservableByType(type: String): Observable<Drink[]> {
    return from(
      fetch(`${API_URL}/drink/?type=${type}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  drinkInputObs(input: HTMLInputElement, host: HTMLElement, order: OrderView) {
    return fromEvent(input, "input")
      .pipe(
        debounceTime(1000),
        map((ev: Event) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length > 3),
        switchMap((type) => this.getDrinkObservableByType(type)),
        map((drink) => drink[0])
      )
      .subscribe((drink) => {
        order.setDrinkOrder(drink);
        order.showOrder(host);
      });
  }
}
