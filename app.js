const loki = require('lokijs');
const uuid= require('uuid');

const db = new loki('konyvek.db');
db.addCollection("konyv", ["id","szerzo", "cim"]);
const b = db.addCollection("konyv2", {
    indices: ["szerzo", "cim"],
    unique: ["id"]
})
try {
    b.insert({
        "id": uuid.v4(),
        "cim": "Micimackó",
        "szerzo": "A. Milne"
    });
    b.insert({
        "id": uuid.v4(),
        "cim": "Kisherceg",
        "szerzo": "Antoine de Saint-Exupéry"
    });
} catch (err) {
    console.log(err);
}

let konyveim = b.find({

});
console.table(konyveim);

const egyKonyv = b.findOne({
    cim: 'Micimackó'
})

console.table(egyKonyv);

b.remove(egyKonyv);

konyveim = b.find({

});
console.table(konyveim);

let kicsi = b.findOne({
    cim: "Kisherceg"
})

//console.log(`Kicsi JSON: ${JSON.stringify(kicsi)}`);

kicsi.cim="Dűne"; 
//console.log(`Kicsi módosítva: ${JSON.stringify(kicsi)}`);

//console.log(`Kicsi: ${kicsi.cim}, (${kicsi.szerzo})`);

b.update(kicsi);

console.table(b.find());

db.saveDatabase(err =>{
    return console.log(err);
})