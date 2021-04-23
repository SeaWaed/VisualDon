const data = require('./SolarEnergy_Swiss.json');

const garesVD = d => d.Kanton ==='VD'

const resultat = data
    .filter(garesVD)
    .sort((a, b) => a.DTV_2018 > b.DTV_2018 ? -1 : 1)
    .slice(0, 5)
    .map(d => ({
        legende : d.MunicipalityName,
        number : d.Scenario1_RoofsOnly_PotentialSolarElectricity_GWh
    }))

console.log(JSON.stringify(resultat));