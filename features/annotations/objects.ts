const profile = {
    name_: 'Alex',
    age: 20,
    coords: {
        lat: 0,
        lng: 15,
    },
    setAge(age: number) {
        this.age = age;
    },
};

// Questo Potente:
// const { age }: { age: number } = profile;
// Sto dicendo che 'profile' ha una proprietà di tipo 'age: number' che assegno a 'age'

// ...anche:
const { age, name_ }: { age: number; name_: string } = profile;

// Si può fare anche con lo coordinate ma difficile:
const {
    coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;

