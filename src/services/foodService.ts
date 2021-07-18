import { debounceTime, map, filter, switchMap } from "rxjs/operators";
import { Food } from "../models/food";
import { from, fromEvent, Observable } from "rxjs";

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

  handleButtonClick(btn: HTMLButtonElement) {
    return fromEvent(btn, "click").pipe(
      map((ev: Event) => (<HTMLButtonElement>ev.target).parentNode),
      map((div) => Array.from(div.querySelectorAll(".FoodType"))),
      map((radios) => <HTMLInputElement[]>radios),
      map((radios) =>
        radios.filter((radio) => radio.checked === true)
      ),
      map((radios) => radios[0]),
      map((radio) => radio.value),
      switchMap((type) => this.getFoodObservableByType(type)),
      map((food) => food[0])
    );
  }
}
