import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";
import { Ad }  from "./models/ad";
import { Order } from "./order";

const API_URL = "http://localhost:3000";

export class AdClass{
    typesOfAd = ["kecap", "majonez", "aleva paprika", "urnebes"];
    getAdObservableById(id: number): Observable<Ad>{
        return from(
            fetch(`${API_URL}/ad/${id}`)
              .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("fetch error");
              })
              .catch((er) => console.log(er))
          );
    }
    getAdObservableByType(type: String): Observable<Ad>{
        return from(
            fetch(`${API_URL}/ad/?type=${type}`)
              .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("fetch error");
              })
              .catch((er) => console.log(er))
          );
    }
    createAdCheckElement(host: HTMLElement, order: Order){
        let option = null;
        let div = document.createElement("div");
        const label = document.createElement("label");
        label.innerHTML = "Tip dodatka";
        div.appendChild(label);

        for (let i = 0; i < this.typesOfAd.length; i++) {
            option = document.createElement("label");
            option.innerHTML = `${this.typesOfAd[i]}`;
            option.className = "Type";
            div.appendChild(option);
        }
        host.appendChild(div);

        const input = document.createElement("input");
        host.appendChild(input);

        fromEvent(input, "input")
        .pipe(
            debounceTime(1000),
            map((ev: Event) => (<HTMLInputElement>ev.target).value),
            switchMap((type) => this.getAdObservableByType(type))
        )
        .subscribe((ad) => {
            order.setAdOrder(ad);
            order.showOrder(host);
        });
    }
}