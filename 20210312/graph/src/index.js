import {
  select,
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

//Transformer les données en données adaptées au cambembert
let getPieData = pie().value(d => d.number);
let pieData = getPieData(DATA);

const WIDTH = 500;
const HEIGHT = 500;

const svg = select('body')
  .append('svg')
  .attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)

const arcCreator = arc()
  .innerRadius(0) //Rayon interne
  .outerRadius(HEIGHT / 2); //Rayon externe

//Définition de la couleur
const color = ({ data }) => {
  switch (data.legende) {
    case 'Lausanne': return 'blue'
    case 'Yverdon-les-Bains': return 'red'
    case 'Montreux': return 'green'
    case 'Renens': return 'orange'
    default: return 'black'
  }
}

//Centrer le cambembert via un groupe
const group = svg.append('g')
  .attr('transform', `translate(${HEIGHT / 2}, ${HEIGHT / 2})`);

group.selectAll('path')
  .data(pieData)
  .enter()
  .append('path')
  .attr('d', arcCreator)
  .attr('fill', color);

group.selectAll('text')
  .data(pieData)
  .enter()
  .append('text')
  .attr('transform', d => `translate(${arcCreator.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .attr('font-family', 'sans-serif')
  .attr('font-size', '1.2rem')
  .text(d => d.data.legende)