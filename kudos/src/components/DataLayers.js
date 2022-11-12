import { useState } from "react";
import { createGlobalstate, useGlobalState, Store, GlobalState, createStore } from "state-pool";
import { LineLayer, ScatterplotLayer, COORDINATE_SYSTEM, TextLayer } from "deck.gl";
//import { appTheme } from "../components/Palette";
import axios from "axios";
import { prefix } from "..";
import {
  forceLink,
  forceSimulation,
  forceManyBody,
  forceCenter
} from "d3-force";
import { User } from "./User";
// EX Code to help develop page:
//      https://github.com/d3/d3-force, https://codesandbox.io/s/kfkj8?file=/demo.js, https://tomroth.com.au/fdg-link/
//      deck.gl Example: https://codesandbox.io/s/0q0hx?file=/public/index.html
// import { nodesData, linksData } from "../components/TestData.js"; // dummy data for nodes and links
  
// Note: To get radius size, need to know how many times id appears as source and target <=add together //
/* Acquire user interaction data via GET request */
// TO-DO change get request to be what we plan (this is an already created one) 11/4 Abby

let nodesStore = new GlobalState([{ id: "Poach", radius: 5}, { id: "Abby", radius: 8}, {id: "Gatesana", radius: 9}]);
let linksStore = new GlobalState([{ source: "Abby", target: "Poach"}]);
// let textsData = new GlobalState([{name: "Zenigata", id: 67}]);

// For testing purposes if you don't want to mess with nodesStore
let testStore = new GlobalState([{ id: "Zenigata", radius: 5}, { id: "Hi", radius: 8}]);

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

const data = (nodesStore.value, linksStore.value) //9/26 may be the formatting that leads to ERROR

simulation.nodes(nodesStore.value); // graph nodes
simulation.force("link").links(linksStore.value); // graph links

export function Test() {

  // const [nodesData, setNodesData] = useState([starterDataNodes]);
  // const [linksData, setLinksData] = useState([starterDataLinks]);

  const [nodesData, setNodes, updateNodes] = useGlobalState(nodesStore);
  const [linksData, setLinks, updateLinks] = useGlobalState(linksStore);
  
  const [testData, setTest, updateTest] = useGlobalState(testStore);

  const graph_nodes_url = prefix + "/api/appreciations/usersConnections";
  const graph_links_url = prefix + "/api/appreciations/links";
  const graph_text_url = prefix + "/api/user/nodeText";
  const graph_id_url = prefix + "/api/user/nodeIds";

  // Radius Calculation
  // Get all user ids and loops through to find all connections associated with user
  const populateNodesList = () => {
    let urls = [graph_nodes_url, graph_id_url];

    // Reference: https://blog.logrocket.com/using-axios-all-make-concurrent-requests/
    axios.all(urls.map((url) => axios.get(url)))
    .then(axios.spread((...responses) => {
      // updateData(function(testData){
      //   testData = [{name: "Harry", id: 66}, {name: "Sparty", id: 4}, {name: "Ophelia", id: 89}];
      // });
      //Only setData ONCE ..?
      // Endless loop
      //setNodes([{ id: "Poach", radius: 5}, { id: "Abby", radius: 8}, {id: "Ophelia", radius: 9}]);
    }))
    .catch(error => {
        console.log("ERROR" + error);
    });
  }

  //console.log("I AM OUTSIDE" + nodesData[1].id);

  // Find who talks to who
  // Get send id and recieve id to determine links
  // Filter through to remove doubles
  const populateLinksList = () => {
    axios.get(graph_links_url)
    .then(response => {
        let table_len = 0;
        table_len = response.data.kudos.length;
    })
    .catch(error => {
        console.log("ERROR" + error);
    });
  }

  // Get name attatched with node
  // user table return id and names
  const populateTextList = () => {
    axios.get(graph_text_url)
    .then(response => {
        let table_len = 0;
        table_len = response.data.kudos.length;
    })
    .catch(error => {
        console.log("ERROR" + error);
    });
  }

  populateNodesList();
  populateLinksList();
  populateTextList();
}

export function DataLayers() {

  const [nodesData, setNodes, updateNodes] = useGlobalState(nodesStore);
  const [linksData, setLinks, updateLinks] = useGlobalState(linksStore);
  
  const [testData, setTest, updateTest] = useGlobalState(testStore);

    //only call Test the first time
    Test();

    //console.log("My name is " + testData[1].id);
    //console.log(testData);

    const [fnode, setFnode] = useState(nodesData); // fnodes is getting set w/2 original nodes not the 3 of nodesData global
    const [flinks, setFlinks] = useState(linksData);
  
    // What actually updates the graph
    const ticked = () => {
      const newData = JSON.parse(JSON.stringify(data));
      // Gets stuck in loop which causes dissapearing graph
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
      getRadius: d => d.radius, //TO-DO: radius larger for the more connections they have, ratio and affects line distance
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