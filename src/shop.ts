import { fromEvent, from, Observable } from "rxjs/index";
import { debounceTime, map, filter, switchMap } from "rxjs/operators/index";
import { Shop } from "./models/shop";

//const API_URL = "http://localhost:3000";
export class Shops {
  getShopObservableByName(name: string): Observable<Shop[]> {
    console.log(`fetching a shop with name: ${name}`);
    return from(
      fetch(`${process.env.API_URL}/shops/?name=${name}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  createShopSearchBoxByName() {
    const label = document.createElement("label");
    label.innerHTML = "Shop name ";
    document.body.appendChild(label);
    const input = document.createElement("input");
    document.body.appendChild(input);
    fromEvent(input, "input")
      .pipe(
        debounceTime(2000),
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        filter((text) => text.length >= 3),
        switchMap((name) => this.getShopObservableByName(name)),
        map((shops) => shops)
      )
      .subscribe((shops) => this.showShops(shops));
  }

  getShopObservableByLocation(value: string): Observable<Shop[]> {
    console.log(`fetching shops with location: ${value}`);
    return from(
      fetch(`${process.env.API_URL}/shops/?location=${value}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch location error");
        })
        .catch((err) => console.log(err))
    );
  }

  createShopSearchBoxByLocation() {
    let label = document.createElement("label");
    label.innerHTML = "Location";
    label.className = "shopLocation";
    document.body.appendChild(label);
    let input = document.createElement("input");
    input.className = "shopLocationInput";
    document.body.appendChild(input);

    fromEvent(input, "input")
      .pipe(
        debounceTime(1000),
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        switchMap((location) => this.getShopObservableByLocation(location))
      )
      .subscribe((shops) => this.showShops(shops));
  }

  showShop(shop: Shop) {
    if (!shop) return;
    const div = document.createElement("div");
    div.innerHTML = `${shop.id}, ${shop.name}, ${shop.location}, ${shop.number_of_employees}`;
    div.className = "Shop";
    document.body.appendChild(div);
  }

  showShops(shops: Shop[]) {
    if (!shops) return;
    Array.from(document.getElementsByClassName("Shop")).forEach(function (
      item
    ) {
      document.body.removeChild(item);
    });
    shops.forEach((shop) => {
      this.showShop(shop);
    });
  }
}