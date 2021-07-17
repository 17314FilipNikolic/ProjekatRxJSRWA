import { Ad } from "../models/ad";
import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, map, filter, switchMap } from "rxjs/operators";
import { OrderView } from "../views/orderView";

const API_URL = "http://localhost:3000";

export class AdService {
  getAdObservableById(id: number): Observable<Ad> {
    return from(
      fetch(`${API_URL}/ad/${id}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  getAdObservableByType(type: String): Observable<Ad[]> {
    return from(
      fetch(`${API_URL}/ad/?type=${type}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  getAdObservableByTypes(types: String[]): Observable<Ad[]> {
    let typeString: String;
    if (types && types.length !== 0) {
      typeString = `${types[0]}`;
      types &&
        types.forEach((type, index) => {
          if (index !== 0) {
            typeString = `${typeString}&type=${type}`;
          }
        });
    }
    return from(
      fetch(`${API_URL}/ad/?type=${typeString}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  handleButtonClick(btn: HTMLButtonElement, div: HTMLDivElement) {
    console.log(div.getElementsByClassName("AdType"));
    return fromEvent(btn, "click").pipe(
      map((ev: Event) => (<HTMLButtonElement>ev.target).parentNode),
      map((div) => Array.from(div.querySelectorAll(".AdType"))),
      map((checkBoxs) => <HTMLInputElement[]>checkBoxs),
      map((checkBoxs) =>
        checkBoxs.filter((checkBox) => checkBox.checked === true)
      ),
      map((checkBoxs) => checkBoxs.map((checkBox) => checkBox.value)),
      switchMap((types) => this.getAdObservableByTypes(types))
    );
  }
}
