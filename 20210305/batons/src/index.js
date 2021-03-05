import {
  axisLeft,
  select,
  scaleLinear,
  max,
} from 'd3'

const DATA = [
  {
      "legende": "Lausanne",
      "number": 326.86
  },
  {
      "legende": "Yverdon-les-Bains",
      "number": 125.72
  },
  {
      "legende": "Ollon",
      "number": 79.59
  },
  {
      "legende": "Ecublens (VD)",
      "number": 79.54
  },
  {
      "legende": "Montreux",
      "number": 75.73
  }
]

const WIDTH = 1000
const HEIGHT = 500
const MARGIN = 5
const MARGIN_LEFT = 50
const MARGIN_BOTTOM = 50
const BAR_WIDTH = (WIDTH - MARGIN_LEFT) / DATA.length

const svg = select('body')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const yScale = scaleLinear()
  .domain([0, max(DATA, d => d.number)])
  .range([HEIGHT - MARGIN_BOTTOM, 0])


const g = svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT}, 0)`)

g.selectAll('rect')
  .data(DATA)
  .enter()
  .append('rect')
  .attr('x', (d, i) =>  i * BAR_WIDTH)
  .attr('width', BAR_WIDTH - MARGIN)
  .attr('y', d => yScale(d.number))
  .attr('height', d => HEIGHT - MARGIN_BOTTOM - yScale(d.number))
  .attr('fill', 'steelblue')

g.selectAll('text')
  .data(DATA)
  .enter()
  .append('text')
  .text(d => d.legende)
  .attr('x', (d, i) =>  i * BAR_WIDTH + BAR_WIDTH / 2)
  .attr('y', HEIGHT - MARGIN_BOTTOM / 2)
  .attr('text-anchor', 'middle')

const axisY = axisLeft().scale(yScale)
  .tickFormat(d => `${d}`)
  .ticks(5)

svg.append('g')
  .attr('transform', `translate(${MARGIN_LEFT - 3})`)
  .call(axisY)
