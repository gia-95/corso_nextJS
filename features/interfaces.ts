interface Reportable {
    summary(): string;
}

interface Vehicle {
    name: string;
    year: Date;
    broken: boolean;
}

/* . LA COSA IMPORTANTE: NELLA INTERFACCIA PUOI METTERE ANCHE TIPI NON PRIMITIVI E FUNZIONI! */

const oldCivic = {
    name: 'civic',
    year: new Date(),
    broken: true,
    summary(): string {
        return `Summary: Name - ${this.name}`;
    },
};

const drink = {
    color: 'Brown',
    carbonated: true,
    sugar: 40,
    summary(): string{
        return `My drink has ${this.sugar} gram of sugar.`
    }
}

const printVehicle = (vehicle: {
    name: string;
    year: Date;
    broken: boolean;
    summary(): string;
}): void => {
    console.log(vehicle.summary());
};

printVehicle(oldCivic);

// Ma così è troppo lungo!!
// ... usiamo le --> INTERFACES

const printSummary = (item: Reportable): void => {
    console.log(item.summary());
};


printSummary(oldCivic);
printSummary(drink);



// Typescript vede che l'oggetto passato (che deve essere Reportable), contiene l'unica cosa di Reopsrtable
// ovvero la funzione 'summary()' --> cell'ha, per lui va bene, amche se ha proprietà in più
