/*
Le tuple sono degli array tipizzati!
*/

const drink = {
    color: 'brown',
    carbonated: true,
    sugar: 40,
};

// Una Tupla è un array in cui specifico i tipi prima!
const pepsi: [string, boolean, number] = ['brown', true, 40];

// ...cos' non posso fare:
// pepsi[0] = 40;
// ...se non avessi tipizzato avrei potuto farlo.

type Drink = [string, boolean, number];

const pepsi2: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', false, 10];
// ...

const carSpecs: [number, number] = [400, 3354];
// ma non si capisce che sono quei numeri
const carStats = {
    horsePower: 400,
    weight: 3353,
};

