const add = (a: number, b: number): number => {
    return a + b;
}; // Se non avessi messo il tipo di ritorno, in questo caso TS avrebbe capito da solo (Inference)

const subtract = (a: number, b: number) => {
    a - b;
}; // Tipizza il ritorno con 'void' (giustamente!)
// Tipizza sempre tutto!!

// Altro modo per scrivere funzione
function divide(a: number, b: number): number {
    return a / b;
}

// Altro modo
const multiply = function (a: number, b: number): number {
    return a * b;
};


const logger = (message: string): void => {
    console.log(message);
};

// 'never' -> carino! never per dirgli che la funzioe non arriverà mai alla fine; se metti un return ti dice sbagliato (non penso si utilizzi spesso)
const throwError = (message: string): never => {
    throw new Error(message);
};

//Questo è carino / potente :
const todayWeather = {
    date: new Date(),
    weather: 'sunny'
};

const logWeather = (forecast: { date: Date, weather: string }): void => {
    console.log(forecast.date);
    console.log(forecast.weather);
}; // Tipizzo l'oggetto di input con le proprietà che specifico
logWeather(todayWeather);

// ...posso anche fare (ancora più potente):
const logWeather2 = ({ date, weather }: { date: Date, weather: string }): void => {
    console.log(date);
    console.log(weather);
}; // l'oggetto spcificato prima deve avere la forma della tipizzazione dopo
logWeather2(todayWeather);
// (mettere un ogggetto come parametro di input, invece che nome variabile, è la DESTRUCTURING)



