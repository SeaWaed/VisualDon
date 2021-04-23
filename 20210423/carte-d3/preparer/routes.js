const data = require('./gland.json')

const result = data.features
  .filter(d => d.geometry.type === 'LineString' && d.properties.highway)

console.log(
  JSON.stringify(
    result
  )
)