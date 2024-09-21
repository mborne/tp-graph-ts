import express, { Express, Request, Response } from "express";

import { BdtopoLoader } from './io/BdtopoLoader';
import { FileStore } from './io/FileStore';
import { Graph } from "./model/Graph";
import { Edge } from "./model/Edge";
import { Vertex } from "./model/Vertex";

const app: Express = express();
const port = process.env.PORT || 3000;

const DEFAULT_RESOURCE_NAME = 'bdtopo-loray';

const fileStore = new FileStore();
const bdtopoLoader = new BdtopoLoader();

const graphs: Map<string, Graph> = new Map();
console.log("loading bdtopo-loray...");
bdtopoLoader.loadGraphFromFile(fileStore.getAbsolutePath('bdtopo-loray/troncon_de_route.geojson')).then((graph) => {
  console.log("bdtopo-loray loaded");
  graphs[DEFAULT_RESOURCE_NAME] = graph;
});


app.get("/", (req: Request, res: Response) => {
  // TODO : display public folder with an OpenLayer map
  res.send("Express + TypeScript Server");
});

app.get("/api/vertices", (req: Request, res: Response) => {
  const resourceName = DEFAULT_RESOURCE_NAME;
  // convert vertices to a GeoJSON FeatureCollection
  const features = graphs[resourceName].vertices.map((vertex: Vertex) => {
    return {
      type: "Feature",
      properties: {
        id: vertex.id
      },
      geometry: {
        type: "Point",
        coordinates: vertex.coordinate
      }
    }
  });
  return res.json({
    type: "FeatureCollection",
    features: features
  });
});



app.get("/api/edges", (req: Request, res: Response) => {
  const resourceName = DEFAULT_RESOURCE_NAME;
  // convert vertices to a GeoJSON FeatureCollection
  const features = graphs[resourceName].edges.map((edge: Edge) => {
    return {
      type: "Feature",
      properties: {
        id: edge.id,
        cost: edge.getLength()
      },
      geometry: edge.getGeometry()
    }
  });
  return res.json({
    type: "FeatureCollection",
    features: features
  });
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});