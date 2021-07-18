import { AdService } from "../services/adService";
import { OrderService } from "../services/orderService";

export class AdView {
  typesOfAd = ["kecap", "majonez", "aleva paprika", "urnebes"];
  adService: AdService;

  constructor() {
    this.adService = new AdService();
  }

  createAdCheckElement(host: HTMLElement, order: OrderService) {
    let div = document.createElement("div");
    div.className = "AdContainer";
    const label = document.createElement("div");
    label.innerHTML = "Izaberite tip priloga:";
    label.className = "AdTyp";
    div.appendChild(label);

    this.typesOfAd.forEach((type, index) => {
      const adCheck = document.createElement("input");
      adCheck.type = "checkbox";
      adCheck.name = "Ad";
      adCheck.className = "AdType";
      adCheck.value = `${type}`;
      adCheck.id = `${index}`;
      div.appendChild(adCheck);
      
      const adLabel = document.createElement("label");
      adLabel.className = "adLabel";
      adLabel.innerHTML = `${index + 1}: ${type}`;
      adLabel.htmlFor = `${index}`;
      div.appendChild(adLabel);

      div.appendChild(document.createElement("br"));
    });

    const btnAd = document.createElement("button");
    btnAd.innerHTML = "Naruci priloge";
    div.appendChild(btnAd);

    order.createAdObservable(btnAd);

    const btnRemove = document.createElement("button");
    btnRemove.innerHTML = "Izbaci priloge";
    div.appendChild(btnRemove);

    order.createAdRemoveObservable(btnRemove);

    host.appendChild(div);
  }
}
