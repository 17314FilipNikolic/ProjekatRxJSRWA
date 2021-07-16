import { AdService } from "../services/adService";
import { OrderView } from "../views/orderView";

const API_URL = "http://localhost:3000";

export class AdView {
  typesOfAd = ["kecap", "majonez", "aleva paprika", "urnebes"];
  adService: AdService;

  constructor(){
    this.adService = new AdService();
  }

  createAdCheckElement(host: HTMLElement, order: OrderView) {
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

    this.adService.AdInputObservable(input, host, order)

    const inputRemove = document.createElement("input");
    inputRemove.className = "removeAdInput";
    div.appendChild(inputRemove);

    host.appendChild(div);

    this.adService.AdRemoveObservable(inputRemove, host, order);
  }
}
