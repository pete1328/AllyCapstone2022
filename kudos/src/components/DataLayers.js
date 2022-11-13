import React, { useState } from "react";
import { TextLayer, LineLayer, ScatterplotLayer, COORDINATE_SYSTEM } from "deck.gl";
import { appTheme } from "../components/Palette";
import {
  forceLink,
  forceSimulation,
  forceManyBody,
  forceCenter
} from "d3-force";
import { nodesData, linksData } from "../components/TestData.js";

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

const data = (nodesData, linksData);

simulation.nodes(nodesData); // graph nodes
simulation.force("link").links(linksData); // graph links

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

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
      getRadius: d => d.radius,
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

  // For names of users to go over respective nodes
  const textLayer = new TextLayer({
    id: "text-layer",
    data: fnode,
    characterSet: 'auto',
    getText: d => d.name, //'id' is attribute name in fnode dictionary rn 11/4
    getPosition: d => {
      return [d.x, d.y, 0]; //same position as the coorelating node
    },
    getColor: d => [95, 40, 94],
    setSize: d => 20 //TO-DO: make it a ratio instead 11/4 Abby
  });

  const layers = [lineLayer, scatterLayer, textLayer];

  return layers;
};

// EX Code to help develop page:
//      https://github.com/d3/d3-force, https://codesandbox.io/s/kfkj8?file=/demo.js, https://tomroth.com.au/fdg-link/
//      deck.gl Example: https://codesandbox.io/s/0q0hx?file=/public/index.html