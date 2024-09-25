import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { RouteStyle } from './styles/RouteStyle';
import { VertexStyle } from './styles/VertexStyle';

const verticesLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: '/api/vertices',
  }),
  style: new VertexStyle()
});

const edgesLayer = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: '/api/edges',
  }),
  style: new VertexStyle()
});

const routeSource = new VectorSource({});
const routeLayer = new VectorLayer({
  source: routeSource,
  features: [],
  style: new RouteStyle()
});


const map = new Map({
  target: 'map',
  layers: [
    /*new TileLayer({
      source: new OSM()
    }),*/
    edgesLayer,
    verticesLayer,
    routeLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

/**
 * zoom to vertex extent
 */
verticesLayer.getSource().on("featuresloadend", function () {
  map.getView().fit(verticesLayer.getSource().getExtent());
});

/**
 * handle clicks to compute paths
 */
const routeVertices = [];
map.on('singleclick', function (e) {
  const features = map.getFeaturesAtPixel(e.pixel,{
    layerFilter: (layer) => {
      return layer === verticesLayer
    }
  });
  if ( features.length == 0 ){
    console.log('no vertex at location');
    return;
  }
  // keep first
  const vertexId = features[0].get('id');
  console.log(`clicked on ${vertexId}`);
  routeVertices.push(vertexId);
  if ( routeVertices.length == 2 ){
    const origin = routeVertices[0];
    const destination = routeVertices[1];
    // reset routeVertices
    routeVertices.length = 0;

    const routeUrl = `/api/route?origin=${origin}&destination=${destination}`;
    console.log(`GET ${routeUrl} ...`);
    fetch(routeUrl).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(`found route with ${data.features.length} edge(s)`);
      const format = new GeoJSON({
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      });
      routeSource.clear();
      routeSource.addFeatures(format.readFeatures(data));
    });
  }
});
