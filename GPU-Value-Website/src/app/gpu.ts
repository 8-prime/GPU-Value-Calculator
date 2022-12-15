export class GPU {
    brand: string;
    fourKUltra: number;
    name: string;
    tenMedium: number;
    tenUltra: number;
    twoKUltra: number;
    price: number;

    constructor(brand: string, fourkUltra: number, name: string, tenMedium: number, tenUltra: number, twoKUltra: number) {
        this.brand = brand;
        this.fourKUltra = Number(fourkUltra),
        this.name = name;
        this.tenMedium = Number(tenMedium);
        this.tenUltra = Number(tenUltra);
        this.twoKUltra = Number(twoKUltra);
        this.price = 1000;        
    }
}
