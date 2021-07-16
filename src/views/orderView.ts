export class OrderView {
  showOrder(
    food: String,
    ad: String,
    drink: String,
    order_lbl: HTMLLabelElement
  ) {
    if (food !== undefined && ad !== undefined && drink !== undefined)
      order_lbl.innerHTML = `Zelite da narucite: ${food}, sa prilogom: ${ad} i sa picem: ${drink} ?`;
    else order_lbl.innerHTML = `Uneli ste pogresno neki podatak`;
  }
}
