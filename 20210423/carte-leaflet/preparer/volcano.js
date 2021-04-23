const data = require('./japan.json')

const result = data.features
  .filter(d => d.geometry.type === 'Point' && d.properties.natural === 'volcano')
  .map(d => ({cord: d.geometry.coordinates, name: d.properties.name}))

console.log(
  JSON.stringify(
    result
  )
)