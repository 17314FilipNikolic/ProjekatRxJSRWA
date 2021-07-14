import { searchForFood } from "../services/orderService";

export function drawPage() {
  const inputDiv = document.createElement("div");
  inputDiv.classList.add("unosDiv");
  document.body.appendChild(inputDiv);

  const food_input = document.createElement("input");
  inputDiv.appendChild(food_input);

  const food_lbl = document.createElement("label");
  inputDiv.appendChild(food_lbl);
  food_lbl.innerHTML = "ovde je hrana";

  const ad_input = document.createElement("input");
  inputDiv.appendChild(ad_input);

  const ad_lbl = document.createElement("label");
  inputDiv.appendChild(ad_lbl);
  ad_lbl.innerHTML = "ovde je prilog";

  const drink_input = document.createElement("input");
  inputDiv.appendChild(drink_input);

  const drink_lbl = document.createElement("label");
  inputDiv.appendChild(drink_lbl);
  drink_lbl.innerHTML = "ovde je pice";

  const orderDiv = document.createElement("div");
  orderDiv.classList.add("narudzbinaDiv");
  document.body.appendChild(orderDiv);

  const order_lbl = document.createElement("label");
  orderDiv.appendChild(order_lbl);
  order_lbl.innerHTML = "ovde je narudzbina";

  searchForFood(
    food_input,
    ad_input,
    drink_input,
    order_lbl,
    food_lbl,
    ad_lbl,
    drink_lbl
  );
}
