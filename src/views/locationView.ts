import { LocationService } from "../services/locationService";
import { OrderService } from "../services/orderService";

export class LocationView {
  locationService: LocationService;

  constructor() {
    this.locationService = new LocationService();
  }

  createLocationInputElement(host: HTMLElement, order: OrderService) {
      const div = document.createElement("div");
      div.className = "LocationContainer";

      const label = document.createElement("div");
      label.innerHTML = "Unesite lokaciju na kojoj zelite dostavu:"
      label.className = "LocationOrder";
      div.appendChild(label);

      const input = document.createElement("input");
      input.className = "LocationInput";
      div.appendChild(input);

      order.createLocationObservable(input);

      host.appendChild(div);
  }
}
