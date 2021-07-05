import { FoodClass } from "./food";
import { AdClass } from "./ad";
import { Order } from "./order";

const food = new FoodClass();
const ad = new AdClass();
const order = new Order();

food.createFoodCheckElement(document.body, order);
ad.createAdCheckElement(document.body, order);