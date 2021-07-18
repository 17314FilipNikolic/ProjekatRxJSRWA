import { debounceTime, map, switchMap } from "rxjs/operators";
import { Drink } from "../models/drink";
import { from, fromEvent, Observable } from "rxjs";

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

  handleButtonClick(btn: HTMLButtonElement) {
    return fromEvent(btn, "click").pipe(
      debounceTime(1000),
      map((ev: Event) => (<HTMLButtonElement>ev.target).parentNode),
      map((div) => Array.from(div.querySelectorAll(".DrinkType"))),
      map((radios) => <HTMLInputElement[]>radios),
      map((radios) =>
        radios.filter((radio) => radio.checked === true)
      ),
      map((radios) => radios[0]),
      map((radio) => radio.value),
      switchMap((type) => this.getDrinkObservableByType(type)),
      map((drink) => drink[0])
    );
  }
}
