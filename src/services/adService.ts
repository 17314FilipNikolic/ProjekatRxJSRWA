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

  handleButtonClick(ad: string[]) {
    return this.getAdObservableByTypes(ad);
  }

  AdInputObservable(
    input: HTMLInputElement,
    host: HTMLElement,
    order: OrderView
  ) {
    return fromEvent(input, "input")
      .pipe(
        debounceTime(1000),
        map((ev: Event) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length > 3),
        switchMap((type) => this.getAdObservableByType(type)),
        map((ads) => ads[0])
      )
      .subscribe((ad) => {
        order.setAdOrder(ad);
        order.showOrder(host);
      });
  }

  AdRemoveObservable(
    input: HTMLInputElement,
    host: HTMLElement,
    order: OrderView
  ) {
    return fromEvent(input, "input")
      .pipe(
        debounceTime(1000),
        map((ev: Event) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length > 3),
        switchMap((type) => this.getAdObservableByType(type)),
        map((ads) => ads[0])
      )
      .subscribe((ad) => {
        order.deleteAdOrder(ad);
        order.showOrder(host);
      });
  }
}
