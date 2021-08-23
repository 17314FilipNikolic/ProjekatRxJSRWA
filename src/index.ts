import { FoodView } from "./views/foodView";
import { AdView } from "./views/adView";
import { DrinkView } from "./views/drinkView";
import { LocationView } from "./views/locationView"
import { OrderView } from "./views/orderView";
import { OrderService } from "./services/orderService";

const food = new FoodView();
const ad = new AdView();
const drink = new DrinkView();
const location = new LocationView();
const order = new OrderView();
const orderService = new OrderService();

food.createFoodCheckElement(document.body, orderService);
drink.createDrinkCheckElement(document.body, orderService);
ad.createAdCheckElement(document.body, orderService);
location.createLocationInputElement(document.body, orderService);
orderService.makeOrder(order, document.body);
