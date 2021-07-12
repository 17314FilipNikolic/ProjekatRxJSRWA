import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, map, switchMap, filter } from "rxjs/operators";
import { Ad } from "./models/ad";
import { Order } from "./order";

const API_URL = "http://localhost:3000";

export class AdClass {
  typesOfAd = ["kecap", "majonez", "aleva paprika", "urnebes"];
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
  createAdCheckElement(host: HTMLElement, order: Order) {
    let option = null;
    let div = document.createElement("div");
    div.className = "AdContainer";
    const label = document.createElement("div");
    label.innerHTML = "Tip dodatka:";
    label.className = "AdTyp";
    div.appendChild(label);

    for (let i = 0; i < this.typesOfAd.length; i++) {
      option = document.createElement("div");
      option.innerHTML = `${i + 1}: ${this.typesOfAd[i]}`;
      option.className = "AdType";
      div.appendChild(option);
    }
    const divInput = document.createElement("div");
    const input = document.createElement("input");
    divInput.className = "AdInput";
    divInput.appendChild(input);
    div.appendChild(divInput);

    host.appendChild(div);

    fromEvent(input, "input")
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

    const inputRemove = document.createElement("input");
    input.className = "removeAdInput";
    div.appendChild(inputRemove);

    host.appendChild(div);

    fromEvent(inputRemove, "input")
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
