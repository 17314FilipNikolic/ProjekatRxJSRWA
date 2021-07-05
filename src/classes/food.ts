

export class FoodCl{
    id: number;
    type: String;
    price: number;
    content: String;
    constructor(Id:number, Type: String, Price: number, Content: String){
        this.id = Id;
        this.type = Type;
        this.price = Price;
        this.content = Content;
    }
}