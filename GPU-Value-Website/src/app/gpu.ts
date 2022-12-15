export class GPU {
    name: string;
    price: number;
    fps: number;
    value: string;
    brand: string;

    constructor(name: string, price: number, fps: number, value: string, brand: string) {
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.fps = fps;
        this.value = value;   
    }
}
