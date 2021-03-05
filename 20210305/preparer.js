const data = require('./SolarEnergy_Swiss.json');

const resultat = data
    .filter(d => d.Canton === "Vaud")
    .sort((a, b) => a.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh > b.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh ? -1 : 1)
    .slice(0, 5)
    .map(d => ({
        legende : d.MunicipalityName,
        number : d.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh
    }))

console.log(JSON.stringify(resultat));