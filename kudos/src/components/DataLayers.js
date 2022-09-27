import React, { useState } from "react";
import { LineLayer, ScatterplotLayer, COORDINATE_SYSTEM } from "deck.gl";
import { appTheme } from "../components/Palette";

import {
  forceLink,
  forceSimulation,
  forceManyBody,
  forceCenter
} from "d3-force";

import { nodesData, linksData } from "../components/TestData.js"; //was 'import DATASET'

// Establish forces
const simulation = forceSimulation()
  .force(
    "link",
    forceLink().id(function(d) {
      return d.id;
    })
  ) //between links
  .force("charge", forceManyBody()) //so that nodes attract/repel e.o.
  .force("center", forceCenter(0, 0)); //so that everything is drawn towards center

const data = (nodesData, linksData) //9/26 may be the formatting that leads to ERROR

simulation.nodes(nodesData); // graph nodes
simulation.force("link").links(linksData); // graph links

export default props => {
    const [fnode, setFnode] = useState(nodesData);
    const [flinks, setFlinks] = useState(linksData);
  
    // What actually updates the graph
    const ticked = () => {
      const newData = JSON.parse(JSON.stringify(data));
      setFnode(newData.nodes);
      setFlinks(newData.links);
    };

simulation.on("tick", ticked); // plots it visually

// Use deck.gl scatterplot/line layers
const scatterLayer = new ScatterplotLayer({
    id: "scatterplot-layer",
    coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
    data: fnode,
    pickable: true,
    opacity: 1,
    stroked: true,
    getPosition: d => {
      return [d.x, d.y, 0];
    },
    getRadius: d => 10,
    getFillColor: d => [255, 247, 240], //should be champagne #FFF7F0
    getLineColor: [95, 40, 94] //should be plum #5F285E
});

const lineLayer = new LineLayer({
    id: "line-layer",
    coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
    data: flinks,
    getWidth: 2,
    getSourcePosition: d => [d.source.x, d.source.y, 0],
    getTargetPosition: d => [d.target.x, d.target.y, 0],
    getColor: d => [95, 40, 94]
});

const layers = [lineLayer, scatterLayer];
//GOAL - Add nameLayer, employee name attached to nodes

  return layers;
};