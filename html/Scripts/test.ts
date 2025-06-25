interface MapStringToBoolean {
    [key: string]: boolean;
}
let a: MapStringToBoolean = {"wert1": true, "wert2": false};



interface VectorWithMeaning {
    x: number;
    y: number;
    meaning: string;
}
let vector: VectorWithMeaning = {x: 12.4, y: -7.2, meaning: "Ortsvektor"};



interface Student {
    name: string;
    matrikel: number;
    grades: {[module: string]: number};
}
let students: Student[] = [];

students.push({name: "Big Brain", matrikel: 123456, grades: {"EIA1": 1.3, "EIA2": 1.0}});
