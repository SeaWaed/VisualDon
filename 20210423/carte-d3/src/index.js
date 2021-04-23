import {
  geoMercator,
  geoPath,
  select,
} from 'd3'

import hairdresser from './hairdresser.json'
import batiments from './batiments.json'
import routes from './routes.json'

const WIDTH = 800
const HEIGHT = 450

const projection = geoMercator()
  .fitExtent(
    [[0, 0], [WIDTH, HEIGHT]],
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[6.2609900,46.4166700], [6.2778400,46.4231200]]}
      }
  )

const pathGenerator = geoPath().projection(projection)

const svg = select('#map').append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

  svg.selectAll('path.routes')
  .data(routes)
  .enter()
  .append('path')
  .attr('class', 'routes')
  .attr('d', pathGenerator)
  .attr('stroke', 'lightgrey')
  .attr('fill', 'none')
  .attr('stroke-width', 5)

svg.selectAll('path.batiments')
  .data(batiments)
  .enter()
  .append('path')
  .attr('class', 'batiments')
  .attr('d', pathGenerator)
  .attr('fill', 'grey')

svg.selectAll('circle')
  .data(hairdresser)
  .enter()
  .append('circle')
  .attr('cx', d => projection(d)[0])
  .attr('cy', d => projection(d)[1])
  .attr('r', 10)
  .attr('fill', 'green')