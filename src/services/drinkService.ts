import { Drink } from "../models/drink";
import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, map, filter, switchMap } from "rxjs/operators";

const API_URL = "http://localhost:3000";

export function drinkInputObs(
  inputEl: HTMLInputElement,
  labelEl: HTMLLabelElement
) {
  return fromEvent(inputEl, "input").pipe(
    debounceTime(500),
    map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
    filter((text) => text.length >= 3),
    switchMap((text) => getDrink(text, labelEl)),
    map((text) => text[0])
  );
}

function getDrink(
  drink: string,
  drink_lbl: HTMLLabelElement
): Observable<Drink[]> {
  return from(
    fetch(`${API_URL}/drink/?type=${drink}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Pice nije pronadjeno");
      })
      .catch((err) => (drink_lbl.innerHTML = "greska"))
  );
}
