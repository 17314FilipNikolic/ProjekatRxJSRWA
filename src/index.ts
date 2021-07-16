import { FoodView } from "./views/foodView";
import { AdView } from "./views/adView";
import { DrinkView } from "./views/drinkView";
import { OrderView } from "./views/orderView";

const food = new FoodView();
const ad = new AdView();
const drink = new DrinkView();
const order = new OrderView();

food.createFoodCheckElement(document.body, order);
drink.createDrinkCheckElement(document.body, order);
ad.createAdCheckElement(document.body, order);
