import L from 'leaflet'
import japan from './volcano.json'

const map = L.map('map').setView([35.362799, 138.730781], 5)

L.tileLayer(
  'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
  {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
  })
    .addTo(map)

const icon = L.icon({
  iconUrl: 'volcano.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
})

japan.map(d => {
  const [lon, lat] = d
  L.marker([lat, lon], {icon}).addTo(map)
})

L.geoJSON(
  japan,
  {
    style: feature =>
      feature.properties['name:fr'] === 'Mont Fuji'
        ? { color: 'indianred' }
        : { color: 'steelblue' },
    onEachFeature: (feature, layer) =>
      layer.bindPopup(feature.properties.name || feature.properties['volcano:status'] || feature.properties.uid)
      
  },
).addTo(map)