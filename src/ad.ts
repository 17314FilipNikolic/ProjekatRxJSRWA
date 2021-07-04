import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, map, switchMap } from "rxjs/operators";
import { Ad }  from "./models/ad";
import { Order } from "./order";

const API_URL = "http://localhost:3000";

export class AdClass{
    order = new Order();
    typesOfAd = ["Sendvic", "Pica", "Gurmanska Pljeskavica", "Pasta"];
    getFoodObservableById(id: number): Observable<Ad>{
        return from(
            fetch(`${API_URL}/ad/${id}`)
              .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("fetch error");
              })
              .catch((er) => console.log(er))
          );
    }
    getFoodObservableByType(type: String): Observable<Ad>{
        return from(
            fetch(`${API_URL}/ad/?type=${type}`)
              .then((response) => {
                if (response.ok) return response.json();
                else throw new Error("fetch error");
              })
              .catch((er) => console.log(er))
          );
    }
    createFoodCheckElement(host: HTMLElement){
        let option = null;
        let div = document.createElement("div");
        let divRb = document.createElement("select");
        const label = document.createElement("label");
        label.innerHTML = "Tip hrane ";
        divRb.appendChild(label);
        div.appendChild(divRb);

        for (let i = 0; i < this.typesOfAd.length; i++) {
            option = document.createElement("option");
            option.innerHTML = `${this.typesOfAd[i]}`;
            option.value = `${this.typesOfAd[i]}`;
            divRb.appendChild(option);
        }
        host.appendChild(div);

        fromEvent(divRb, "onselect")
        .pipe(
            debounceTime(1000),
            map((ev: Event) => (<HTMLSelectElement>ev.target).value),
            switchMap((type) => this.getFoodObservableByType(type))
        )
        .subscribe((ad) => this.order.setAdOrder(ad));
    }
}