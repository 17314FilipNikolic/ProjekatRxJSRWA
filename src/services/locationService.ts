import { Location } from "../models/location";
import { from, fromEvent, Observable } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";

const API_URL = "http://localhost:3000";

export class LocationService {
  getLocationObservableById(id: number): Observable<Location> {
    return from(
      fetch(`${API_URL}/location/${id}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  getLocationObservableByLocation(location: String): Observable<Location[]> {
    return from(
      fetch(`${API_URL}/location/?location=${location}`)
        .then((response) => {
          if (response.ok) return response.json();
          else throw new Error("fetch error");
        })
        .catch((er) => console.log(er))
    );
  }

  handleInputLocation(input: HTMLInputElement){
    return fromEvent(input, "input")
    .pipe(
      debounceTime(500),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((location) => location.length >= 3),
      switchMap((location) => this.getLocationObservableByLocation(location)),
      map((locations: Location[]) => locations[0])
    )
  }
}
