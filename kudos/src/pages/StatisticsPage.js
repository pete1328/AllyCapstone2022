import { React, useState, useEffect } from "react";
import { appTheme } from "../components/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
// import {forceSimulation, forceCenter, forceLink, forceCollide, forceManyBody} from "d3-force";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { DashboardButton, LogoutButton } from "../components/Button";
import "../App.css";
import DeckGL, { OrthographicView } from "deck.gl"; //d3-force
import { TextLayer, LineLayer, ScatterplotLayer, COORDINATE_SYSTEM } from "deck.gl";
import {
  forceLink,
  forceSimulation,
  forceManyBody,
  forceCenter
} from "d3-force";
//import renderLayers from "../components/DataLayers"; //d3-force
import axios from "axios";
import { prefix } from "..";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  export function StatisticsPage() {

    // Side bar variables
    const [allMessages, setAllMessages] = useState([]); // Amount of all appreciations
    const [allKudos, setAllKudos] = useState([]);       // Amount of all kudos points
    const [allUsers, setAllUsers] = useState([]);       // Amount of all users
    const [ratio, setRatio] = useState([]);             // Ratio of letters per person
    const [nodesData, setNodesData] = useState([]);     // list of node id, name, radius
    const [linksData, setLinksData] = useState([]);     // list of link target, source
    const [fnode, setFnode] = useState(nodesData);      // for JSON conversion
    const [flinks, setFlinks] = useState(linksData);    // for JSON conversion

    const offset = 40; //for node outline shades

    // api urls
    const all_appreciations_url = prefix + "/api/appreciations/all";
    //Need?? - const all_users_url = prefix + "/api/totalUsers";
    const users_count_url = prefix + "/api/users/count";
    const graph_nodes_url = prefix + "/api/appreciations/usersConnections";
    const graph_links_url = prefix + "/api/appreciations/links";

    let location = useLocation();

    // Establish forces
    const simulation = forceSimulation()
    .force(
      "link",
      forceLink().id(function(d) {
        console.log("INSIDE Force Calculation");
        return d.id;
      })
    ) //between links
    .force("charge", forceManyBody()) //so that nodes attract/repel e.o.
    .force("center", forceCenter(0, 0)); //so that everything is drawn towards center

    const data = ({nodes: nodesData, links: linksData});
  
    // What actually updates the graph
    const ticked = () => {
      console.log("Data: ", data);
      const newData = JSON.parse(JSON.stringify(data));
      setFnode(newData.nodes);
      setFlinks(newData.links);
      console.log("F-Nodes :",fnode);
      console.log("F-Links:",flinks);
    };

    // Use deck.gl scatterplot/line layers
    const scatterLayer = new ScatterplotLayer({
      id: "scatterplot-layer",
      coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
      data: fnode,
      pickable: true,
      opacity: 1,
      stroked: true,
      getPosition: d => {
        console.log("Node Pos: ", [d.x, d.y]);
        return [d.x, d.y, 0];
      },
      getRadius: d => d.radius,
      getFillColor: d => d.role === "Admin" || d.role === "Manager" ? [0, 188, 212] : [245, 123, 58], //should be champagne #FFF7F0
      getLineColor: d => d.role === "Admin" || d.role === "Manager" ? [0, 188 - offset, 212 - offset] : [245 - offset, 123 - offset, 58 - offset]
    });

    const lineLayer = new LineLayer({
        id: "line-layer",
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        data: flinks,
        getWidth: 6,
        getSourcePosition: d => [d.source.x, d.source.y, 0],
        getTargetPosition: d => [d.target.x, d.target.y, 0],
        getColor: d => [250,243,256], //<- champagne ,[95, 40, 94]
    });

    // For names of users to go over respective nodes
    const textLayer = new TextLayer({
      id: "text-layer",
      data: fnode,
      characterSet: 'auto',
      getText: d => d.name, //'id' is attribute name in fnode dictionary rn 11/4
      getPosition: d => {
        console.log("Text Pos: ", [d.x, d.y]);
        return [d.x, d.y, 0]; //same position as the coorelating node
      },
      getColor: d => [250,243,256],
      setSize: d => 20 //TO-DO: make it a ratio instead 11/4 Abby
    });

    // Purpose: Letters sent DB call
    // Get the total amount of ALL letters sent through Ally Kudos
    const populateAllLettersSent = () => {
      axios.get(all_appreciations_url)
      .then(response => {
          let table_len = 0;
          table_len = response.data.kudos.length;
          setAllMessages(table_len);
      })
      .catch(error => {
          console.log(error);
      });
    }

    // Purpose: Get the total amount of ALL kudos points sent through Ally Kudos
    const populateAllKudosSent = () => {
      axios.get(all_appreciations_url)
      .then(response => {

        let temp = 0;
        // Note: Might try to change to sequelize command in index.js?
        response.data.kudos.forEach(element => {
          let amount = {
            points : element["kudos_points"]
          }
          temp += parseInt(Object.values(amount));
        });  

        setAllKudos(temp);
      })
      .catch(error => {
          console.log(error);
      });
    }

    // Purpose: Participants DB call
    // Get the total amount of ALL users using Ally Kudos
    const populateAllUsers = () => {
      axios.get(users_count_url)
      .then(response => {
          let result = response.data.count[0][0]["Users"];
          setAllUsers(result);
      })
      .catch(error => {
          console.log(error);
      });
    }

    // Purpose: Letters per person calculation
    const populateRatio = () => {

      let urls = [all_appreciations_url, users_count_url];

      // Reference: https://blog.logrocket.com/using-axios-all-make-concurrent-requests/
      axios.all(urls.map((url) => axios.get(url)))
      .then(axios.spread((...responses) => {

          // Getting total amount of letters sent
          let appreciation_len = 0;
          appreciation_len = responses[0].data.kudos.length;

          // Getting the total amount of users
          let user_len = 0;
          user_len = responses[1].data.count[0][0]["Users"];

          // Getting the letters per person
          let stat = 0;
          stat = appreciation_len / user_len;

          setRatio(stat.toFixed(1));
      }))
      .catch(error => {
          console.log(error);
      });
    }

        // Purpose: Radius Calculation
    // Creates a list of nodes to use for deck.gl graph
    // Format: {user_id, name, radius}
    //  user_id: id of user
    //  name: name of user for text layer
    //  radius: determines size of node
    const populateNodesList = () => {

      axios.get(graph_nodes_url)
      .then(response => {
          console.log(response.data.nodes);
          setNodesData(response.data.nodes);
      })
      .catch(error => {
          console.log("ERROR" + error);
      });
    }

    console.log("UPDATES", nodesData);

    // Purpose: Find who talks to who
    // Get send id and recieve id to determine node links
    const populateLinksList = () => {
      axios.get(graph_links_url)
      .then(response => {
          console.log(response.data.links);
          setLinksData(response.data.links);
      })
      .catch(error => {
          console.log("ERROR" + error);
      });
    }

    // // Radius Calculation
    // // Get all user ids and loops through to find all connections associated with user
    // const populateNodesList = () => {
    //   let urls = [graph_nodes_url, graph_id_url];

    //   // Reference: https://blog.logrocket.com/using-axios-all-make-concurrent-requests/
    //   axios.all(urls.map((url) => axios.get(url)))
    //   .then(axios.spread((...responses) => {
    //     setNodesData([{name: "Harry", id: 0, radius: 8},{name: "Lucifer", id: 1, radius: 4},{name: "Paul", id: 4, radius: 6},]);
    //   }))
    //   .catch(error => {
    //       console.log("ERROR" + error);
    //   });
    // }

    // // Find who talks to who
    // // Get send id and recieve id to determine links
    // // Filter through to remove doubles
    // const populateLinksList = () => {
    //   axios.get(graph_links_url)
    //   .then(response => {
    //     setLinksData([{source: 0, target: 1},{source: 0, target: 4},{source: 1, target: 4},]);
    //   })
    //   .catch(error => {
    //       console.log("ERROR" + error);
    //   });
    // }

    const renderLayers = () => {
      console.log("*RENDER LAYERS");

      const layers = [lineLayer, scatterLayer, textLayer];

      return layers;
    }

    // Purpose: Update the side bar content
    const updateContent = () => {
      console.log("*UPDATING CONTENT*");
      populateAllLettersSent();
      populateAllKudosSent();
      populateAllUsers();
      populateRatio();

      populateLinksList();
      populateNodesList();

      simulation.nodes(nodesData); // graph nodes
      simulation.force("link").links(linksData); // graph links
      //simulation.on("tick", ticked); // plots it visually <-- was giving endless look atm

      const newData = JSON.parse(JSON.stringify(data));

      setFnode(newData.nodes);
      setFlinks(newData.links);

      //renderLayers(); // when does this get called extra?
      console.log("*FINISHED UPDATECONTENT*");
    }

    //const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions()); 
    const view = new OrthographicView({ controller: true }); //d3-force

    // useEffect(() => {
    //   function handleResize() {
    //     setWindowDimensions(getWindowDimensions());
    //   }
  
    //   window.addEventListener('resize', handleResize);
    //   return () => window.removeEventListener('resize', handleResize);
    // }, []);

    useEffect(() => {
      window.addEventListener("load", updateContent);
      return () => {
        window.removeEventListener("load", updateContent);
      };
    });
  
    useEffect(() => {
      updateContent();
      // eslint-disable-next-line
    }, [location]); 

    return (
      <main>
        <div className="flex h-screen w-screen bg-blueberry">
          <div className="w-full bg-champange">
            <div className="z-10 fixed flex items-center justify-between pt-4">
              <div className="flex space-x-4 justify-end pt-8 pl-12 p">
                <Link to="/login">
                  <LogoutButton/>
                </Link>
                <Link to="/dashboard">
                    <DashboardButton/>
                </Link>
                <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                  <Button
                  variant="contained"
                  color="grapefruit" 
                  size="large"
                  onClick={() => {updateContent()}}>
                    Update
                  </Button>
                </ThemeProvider>
              </div>
            </div>
            
                <div className="mt-28 mx-12 py-96 bg-seafoam border-plum drop-shadow-2xl border-4">
                <DeckGL
                views={view}
                initialViewState={useState({
                  positon: [0, 0, 0],
                  width: window.innerWidth,
                  height: window.innerHeight,
                  target: [0, 0],
                  zoom: 1
                  //layers: renderLayers()
                })}
                controller={true}
                layers={renderLayers()}
                />
                </div>
              </div>
              <div className="space-y-32 h-full pt-28 px-24">
                <div className="box-style">
                  <p>All Messages: {allMessages}</p>
                </div>
                <div className="box-style">
                  <p>All Kudos: {allKudos}</p>
                </div>
                <div className="box-style">
                  <p>All Users: {allUsers}</p>
                </div>
                <div className="box-style">
                  <p>Letters per Person: {ratio}</p>
                </div>
              </div>
        </div>
      </main>
  );

}