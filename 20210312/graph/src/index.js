import {
  axisLeft,
  select,
  scaleLinear,
  max,
  shape,
  arc,
  pie
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
const container = DOM.svg(WIDTH, HEIGHT)
const svg = d3.select(container)

const arcCreator = d3.arc()
  .innerRadius(0)
  .outerRadius(HEIGHT / 2 - 10)

const color = ({ DATA }) => {
  switch (DATA.name){
    case 'Lausanne': return 'gold'
    case 'Yverdon-les-Bains': return 'blue'
    case 'Ollon': return 'green'
    case 'Ecublens (VD)': return 'orange'
    case 'Montreux': return 'purple'
  }
}

const pie = svg.append('g')
.attr('transform', `translate(${HEIGHT / 2}, ${HEIGHT / 2})`)

pie.selectAll('path')
.data(pieData)
.enter()
.append('path')
.attr('d', arcCreator)
.attr('fill', color)

  // un texte pour chaque tranche
  pie.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    // .centroid permet de trouver le centre de la tranche
    .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.name)

      // la légende
  const legend = svg.append('g')
  .attr('transform', `translate(${HEIGHT-10})`)

  const RECT_WIDTH = 20
  
  // les carrés de couleur3.line()
  legend.selectAll('rect')
    .data(pieData)
    .enter()
    .append('rect')
    .attr('y', (d, i) => i * RECT_WIDTH)
    .attr('width', RECT_WIDTH)
    .attr('height', RECT_WIDTH)
    .attr('fill', color)
  
  // les noms de fruits
  legend.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('x', RECT_WIDTH * 1.5)
    .attr('y', (d, i) => i * RECT_WIDTH + RECT_WIDTH * 0.75)
    .attr('width', RECT_WIDTH)
    .attr('height', RECT_WIDTH)
    .text(d => d.data.name)