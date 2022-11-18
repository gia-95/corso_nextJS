class Vehicle {
    // color: string;

    // constructor(color: string) {
    //     this.color = color;
    // }

    // MOLTO COMODO!
    // invece che scrive classica var e constr --> basta che scrivi così e lui assegna...
    constructor( public color: string ) {
    }

    honk(): void {
        console.log('beep!!');
    }
}
const vehicle = new Vehicle('orange');
console.log(vehicle.color);


class Car extends Vehicle {

    constructor(public wheels: number, color: string) {
        super(color);
    }

    private drive(): void {
        // Posso anche fare un Override!
        console.log('vroom!');
    }

    startDriving(): void {
        this.drive();
    }
}

const car = new Car(4, 'green');
car.startDriving();
car.honk();

/* PROTECTED se devi usare cose nelle sottoclassi! */
