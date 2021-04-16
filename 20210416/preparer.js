const xlsx = require('xlsx');

const file = xlsx.readFile('excel/peinaussteiger2018.xlsx');
const json = xlsx.utils.sheet_to_json(file.Sheets['data']);

const garesVD = d => d.Kanton === 'VD';

const resultat = json
    .filter(garesVD)
    .sort((a, b) => a.DTV_2018 > b.DTV_2018 ? -1 : 1)
    .slice(0, 5)
    .map(d => ({
        ville : d.Bahnhof_Haltestelle,
        gare: d.Eigner,
        traficMoyJour : d.DTV_2018
    }))

console.log(JSON.stringify(resultat));

//Pour sauver le fichier
//node preparer > data.json