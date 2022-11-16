 // Diff. da 'const' --> let per variabile che si può cambiare
let apples: number = 5;  
let speed: string = 'fast';

let hasName: boolean = true;

let nothingMuch: null = null;
let nM: undefined = undefined;

// built in objects
let date: Date = new Date();

// Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1,2,3];
let myBoolen: boolean[] = [true, true, false];

// Classes
class Car {

}                               // la CLASSE la posso assegnare come tipo
let car: Car = new Car();


// Object literal  --> Definisci un oggetto e prima definisci i tipi delle variabili
let point: { x: number, y: number } = {
    x: 10,
    y: 20
};


