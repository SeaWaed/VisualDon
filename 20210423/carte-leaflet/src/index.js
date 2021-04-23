import L from 'leaflet'
import japan from './volcano.json'

const map = L.map('map').setView([35.362799, 138.730781], 5)

L.tileLayer(
  'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.{ext}',
  {
    attribution: '<a href="https://stadiamaps.com/">Stadia Maps</a> <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
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
    style: features =>
      features.properties['name'],
    onEachFeature: (feature, layer) =>
      layer.bindPopup(feature.properties.name || feature.properties['volcano:status'] || feature.id)
      
  },
).addTo(map)