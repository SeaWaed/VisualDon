const data = require('./gland.json')

const result = data.features
  .filter(d => d.geometry.type === 'Point' && d.properties.shop === 'hairdresser')
  .map(d => d.geometry.coordinates)

console.log(
  JSON.stringify(
    result
  )
)