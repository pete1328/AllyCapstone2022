import { useState } from "react";
import { LineLayer, ScatterplotLayer, COORDINATE_SYSTEM, TextLayer } from "deck.gl";
//import { appTheme } from "../components/Palette";
//import axios from "axios";
//import { prefix } from "..";
import {
  forceLink,
  forceSimulation,
  forceManyBody,
  forceCenter
} from "d3-force";
// EX Code to help develop page:
//      https://github.com/d3/d3-force, https://codesandbox.io/s/kfkj8?file=/demo.js, https://tomroth.com.au/fdg-link/
//      deck.gl Example: https://codesandbox.io/s/0q0hx?file=/public/index.html
import { nodesData, linksData } from "../components/TestData.js"; // dummy data for nodes and links

// Note: To get radius size, need to know how many times id appears as source and target <=add together //

// Establish data variables ERROR: needs to be inside export function... 11/4
// let nodesData = useState(); //dictionary of all of the users
// let linksData = useState(); //dictionary of all of the connections between users
//const users_url = prefix + "/api/allUsers";

/* Acquire user interaction data via GET request */
// TO-DO change get request to be what we plan (this is an already created one) 11/4 Abby
// const populateUsers = () => {
//   axios.get(users_url, { params: {
//     user_id: '1',
//   }})
//   .then(response => {
//       let temp = [];
//       response.data.users.forEach(element => {
//         let pair = {
//           name : element["first_name"] + " " + element["last_name"],
//           id : element["user_id"]
//         }
//         temp.push(pair);
//       });
//       //updateUsers(temp);
//   })
//   .catch(error => {
//       console.log(error);
//   });
// }
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

export function DataLayers(props) {
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
    getRadius: d => 10, //TO-DO: radius larger for the more connections they have, ratio and affects line distance
    getFillColor: d => [255, 247, 240], //should be champagne #FFF7F0
    getLineColor: [95, 40, 94] //should be plum #5F285E
});

const lineLayer = new LineLayer({
    id: "line-layer",
    coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
    data: flinks,
    getWidth: 2,
    getSourcePosition: d => [d.source.x, d.source.y, 0], // Determines line connection
    getTargetPosition: d => [d.target.x, d.target.y, 0],
    getColor: d => [95, 40, 94]
});

// For names of users to go over respective nodes
const textLayer = new TextLayer({
    id: "text-layer",
    data: fnode,
    characterSet: 'auto',
    getText: d => d.id, //'id' is attribute name in fnode dictionary rn 11/4
    getPosition: d => {
      return [d.x, d.y, 0]; //same position as the coorelating node
    },
    getColor: d => [95, 40, 94],
    setSize: d => 20 //TO-DO: make it a ratio instead 11/4 Abby
});

const layers = [lineLayer, scatterLayer, textLayer];

  return layers;
};