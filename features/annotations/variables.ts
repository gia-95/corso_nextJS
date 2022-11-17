// Type Annotation -> 'classico x: number'
// Type INFERENCE -> dichiaraz. e assegnaz. sulla stessa riga (ts deduce il tipo)


// Diff. da 'const' --> let per variabile che si può cambiare
let apples: number = 5;
let speed: string = 'fast';
let numero = 6; // Typescript tipizza da solo perchè sulla stessa riga

let hasName: boolean = true;

let nothingMuch: null = null;
let nM: undefined = undefined;

// built in objects
let date: Date = new Date();

// Array
let colors: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3];
let myBoolen: boolean[] = [true, true, false];

// Classes
class Car {} // la CLASSE la posso assegnare come tipo
let car: Car = new Car();

// Object literal  --> Definisci un oggetto e prima definisci i tipi delle variabili
let point: { x: number; y: number } = {
    x: 10,
    y: 20,
};

// Function
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
};

// When to use annotatons:

// 1) Function return a 'any' type
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
/*
Ho tipizzato la var 'coordinates'.
 JSON.parse() torna 'any', così gli dico che tipo deve essere l'ogetto
*/

// 2) When we declare a variable on one line
// and initialize it later
let words = ['red', 'green', 'blue'];
let foundWord: boolean; // potrei non mettere niente, mi da Warn -> si può dedurre

for (let i = 0; i < words.length; i++) {
    if (words[i] === 'green') {
        foundWord = true;
    }
}

// 3) Variablie il cui tipo non può effere dedotto (inferred) correttamente
let numbers = [-1, -2, 3];
let numberAboveZero: boolean | number = false;

for ( let i = 0; i < numbers.length; i++ ) {
    if ( numbers[i] > 0 ) {
        numberAboveZero = numbers[i];
        numberAboveZero = true;         // Queste vanno bene entrambe perchè è tipizzato entrambi
    }                                   // A me sembra particolarmente brutta questa cosa!
}

  
