import { Ad } from "../models/ad";
import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, map, filter, switchMap } from "rxjs/operators";

const API_URL = "http://localhost:3000";

export function adInputObs(
  inputEl: HTMLInputElement,
  labelEl: HTMLLabelElement
) {
  return fromEvent(inputEl, "input").pipe(
    debounceTime(500),
    map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
    filter((text) => text.length >= 3),
    switchMap((text) => getAd(text, labelEl)),
    map((text) => text[0])
  );
}

function getAd(ad: string, ad_lbl: HTMLLabelElement): Observable<Ad[]> {
  return from(
    fetch(`${API_URL}/ad/?type=${ad}`)
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error("Prilog nije pronadjen");
      })
      .catch((err) => (ad_lbl.innerHTML = "greska"))
  );
}
