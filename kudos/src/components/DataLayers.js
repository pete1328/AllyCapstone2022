import { useState } from "react";
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
// EX Code to help develop page:
//      https://github.com/d3/d3-force, https://codesandbox.io/s/kfkj8?file=/demo.js, https://tomroth.com.au/fdg-link/
//      deck.gl Example: https://codesandbox.io/s/0q0hx?file=/public/index.html
//import { nodesData, linksData } from "../components/TestData.js"; // dummy data for nodes and links

/* To collect the node and link dictionaries for the graph */
/* function getNetworkData() {
  const users_url = prefix + "/api/allUsers";
  let nodesData = [];
  let linksData = []; */
  
// Note: To get radius size, need to know how many times id appears as source and target <=add together //

  /* Acquire user interaction data via GET request */
  // TO-DO change get request to be what we plan (this is an already created one) 11/4 Abby
  /* const populateUsers = () => {
    axios.get(users_url, { params: {
      user_id: '1',
    }})
    .then(response => {
      // Establish data variables
      nodesData = [{ id: "Myriel", group: 1 },
     { id: "Napoleon", group: 1 },
     { id: "Mlle.Baptistine", group: 1 }];
     linksData = [
       { source: "Napoleon", target: "Myriel", value: 1 },
       { source: "Mlle.Baptistine", target: "Myriel", value: 8 }]; */
      /* let temp = [];
      response.data.users.forEach(element => {
        let pair = {
          name : element["first_name"] + " " + element["last_name"],
          id : element["user_id"]
        }
        temp.push(pair);
      }); */
      //updateUsers(temp);
    /* })
    .catch(error => {
      console.log(error);
    });
  }
  
  populateUsers();

  return {
    nodesData,
    linksData
  };
} */

export function Test() {

  // ENTIRE app breaks when this is uncommented
  //const [allMessages, setAllMessages] = useState([]);

  const graph_nodes_url = prefix + "/api/appreciations/userConnections";
  const graph_links_url = prefix + "/api/appreciations/links";
  const graph_text_url = prefix + "/api/user/nodeText";
  const graph_id_url = prefix + "/api/user/nodeIds";

  const nodesData = [
    { id: "Myriel", radius: 4},
    { id: "Napoleon", radius: 10},
    { id: "Mlle.Baptistine", radius: 15},
    { id: "Zenigata", radius: 4},
  ];
  
  const linksData = [
    { source: "Napoleon", target: "Mlle.Baptistine"},
    { source: "Mlle.Baptistine", target: "Napoleon"},
    { source: "Zenigata", target: "Napoleon"},
  ];

  // Radius Calculation
  // Get all user ids and loops through to find all connections associated with user
  const populateNodesList = () => {
    let urls = [graph_nodes_url, graph_id_url];

    // Reference: https://blog.logrocket.com/using-axios-all-make-concurrent-requests/
    axios.all(urls.map((url) => axios.get(url)))
    .then(axios.spread((...responses) => {

    }))
    .catch(error => {
        console.log("ERROR" + error);
    });
  }

  // Find who talks to who
  // Get send id and recieve id to determine links
  // Filter through to remove doubles
  const populateLinksList = () => {
    axios.get(graph_links_url)
    .then(response => {
        let table_len = 0;
        table_len = response.data.kudos.length;
        console.log("TEST INSIDE", table_len);
        //setAllMessages(table_len);
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
        console.log("TEST INSIDE", table_len);
        //setAllMessages(table_len);
    })
    .catch(error => {
        console.log("ERROR" + error);
    });
  }

  populateNodesList();
  populateLinksList();
  populateTextList();

  return {
    nodesData,
    linksData,
  };

}

const test2 = Test().nodesData;
const test3 = Test().linksData;

console.log("HERE IS TEST2!" + test2);
console.log("HERE IS TEST3!" + test3);


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

//const nodesData = getNetworkData().nodesData; //Abby 11/8
//const linksData = getNetworkData().linksData; //Abby 11/8
const data = (test2, test3) //9/26 may be the formatting that leads to ERROR

simulation.nodes(test2); // graph nodes
simulation.force("link").links(test3); // graph links

export function DataLayers() {
    const [fnode, setFnode] = useState(test2);
    const [flinks, setFlinks] = useState(test3);
  
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