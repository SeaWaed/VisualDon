const data = require('./japan.json')

const result = data.features
  .filter(d => d.geometry.type === 'Point' && d.properties.natural === 'volcano')
  .map(d => d.geometry.coordinates)

console.log(
  JSON.stringify(
    result
  )
)