// ... qui tipizza da solo (Inference)
const carMakers = ['ford', 'toyota', 'ferrari'];
const date = [new Date(), new Date()];

// ... ma meglio:
const carMakers2: string[] = ['ford', 'toyota', 'ferrari'];

const carMakers3 = []; // Qui non sa di che tipo sarà giustamente!

const arrayDiArray = [['f120'], ['Yaris'], ['Focus']]; // lo tipizza string[][] . (tutto torna)

const arrayDiArray2: string[][] = [['f120'], ['Yaris'], ['Focus']];

// CERCA DI TIPIZZARE IL PI§ POSSIBILE!
// Beneficio 1:
const car = carMakers[0]; // car è una 'string'
const myCar = carMakers2.pop(); // idem ('undefined' penso perchè potrebbe essere vuoto l'array)

// Beneficio 2:
// carMakers.push(11); --> non si può fare.

// Beneficio 3:
carMakers.map((car: string): string => {
    return car.toUpperCase();
}); // Posso utilizzare i metodi e tipizzo!

// Flexible types
const importantdate: (Date | string)[] = [new Date(), '2030-23-11'];
// il tipo è: 'string | date' (farebbe anche da solo con inference)
importantdate.push(new Date());
importantdate.push('ciao');