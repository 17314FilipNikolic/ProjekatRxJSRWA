import { AdService } from "../services/adService";
import { OrderService } from "../services/orderService";
import { OrderView } from "../views/orderView";

export class AdView {
  typesOfAd = ["kecap", "majonez", "aleva paprika", "urnebes"];
  adService: AdService;

  constructor() {
    this.adService = new AdService();
  }

  createAdCheckElement(host: HTMLElement, order: OrderService) {
    let option = null;
    let div = document.createElement("div");
    div.className = "AdContainer";
    const label = document.createElement("div");
    label.innerHTML = "Izaberite tip dodatka:";
    label.className = "AdTyp";
    div.appendChild(label);

    this.typesOfAd.forEach((type, index) => {
      const adLabel = document.createElement("label");
      adLabel.className = "adLabel";
      adLabel.innerHTML = `${index + 1}: ${type}`;
      adLabel.htmlFor = `${index}`;
      div.appendChild(adLabel);

      const adCheck = document.createElement("input");
      adCheck.type = "checkbox";
      adCheck.name = "Ad";
      adCheck.className = "AdType";
      adCheck.value = `${type}`;
      adCheck.id = `${index}`;
      div.appendChild(adCheck);

      div.appendChild(document.createElement("br"));
    });

    const btn = document.createElement("button");
    btn.innerHTML = "Ubaci dodatke u narudzbinu";
    div.appendChild(btn);

    order.createAdObservable(btn, div);

    host.appendChild(div);
  }
}
