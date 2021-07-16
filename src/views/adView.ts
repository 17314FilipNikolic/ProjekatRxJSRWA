import { Ad } from "../models/ad";

export class AdView {
  showAd(ad: Ad, ad_lbl: HTMLLabelElement) {
    if (ad === undefined) {
      ad_lbl.innerHTML = "greska";
    } else {
      ad_lbl.innerHTML = `${ad["type"]}`;
      console.log(ad);
    }
  }
}
