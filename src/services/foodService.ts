import { debounceTime, map, filter, switchMap } from "rxjs/operators";
import { Food } from "../models/food";
import { from, fromEvent, Observable } from "rxjs";

const API_URL = "http://localhost:3000";

export class FoodService {
  
  foodInputObs(inputEl: HTMLInputElement, labelEl: HTMLLabelElement) {
    return fromEvent(inputEl, "input").pipe(
      debounceTime(500),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length >= 3),
      switchMap((text) => this.getFood(text, labelEl)),
      map((text) => text[0])
    );
  }

  getFood(food: string, food_lbl: HTMLLabelElement): Observable<Food[]> {
    return from(
      fetch(`${API_URL}/food/?type=${food}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Hrana nije pronadjena");
          } else {
            return response.json();
          }
        })
        .catch((err) => (food_lbl.innerHTML = "greska"))
    );
  }
}
