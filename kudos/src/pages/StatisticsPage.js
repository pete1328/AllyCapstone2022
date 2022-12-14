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
import { database_prefix } from "..";
import background from "../assets/tile_background.png";
import { TextField, Autocomplete } from "@mui/material";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  export function StatisticsPage(props) {

    // Side bar variables
    const [allMessages, setAllMessages] = useState([]); // Amount of all appreciations
    const [allKudos, setAllKudos] = useState([]);       // Amount of all kudos points
    const [allUsers, setAllUsers] = useState([]);       // Amount of all users
    const [ratio, setRatio] = useState([]);             // Ratio of letters per person
    const [nodesData, setNodesData] = useState([]);     // list of node id, name, radius
    const [linksData, setLinksData] = useState([]);     // list of link target, source
    const [fnode, setFnode] = useState(nodesData);      // for JSON conversion
    const [flinks, setFlinks] = useState(linksData);    // for JSON conversion
    const [myViewState, setMyViewState] = useState({
      //positon: [0, 0, 0],
      width: (window.innerWidth),
      height: (window.innerHeight),
      target: [0, 0, 0],
      zoom: 3.5,
      minZoom: 1,
      maxZoom: 5
    });
    const offset = 40; //for node outline shades
    const [receipient, setReceipient] = useState(0); //for lone nodes list search
    const [listOfNames, setListOfNames] = useState([]); //for lone nodes list printing
    const [listOfFullNames, setListOfFullNames] = useState([]); //for lone nodes search bar

    // api urls
    const all_appreciations_url = database_prefix + "/api/appreciations/all";
    const users_count_url = database_prefix + "/api/users/count";
    const graph_nodes_url = database_prefix + "/api/appreciations/usersConnections";
    const graph_links_url = database_prefix + "/api/appreciations/links";
    const lone_nodes_url = database_prefix + "/api/appreciations/noConnections";

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
    .force("charge", forceManyBody()) //.strength(-30), so that nodes attract/repel e.o.
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
      getFillColor: d => d.role === "Admin" ? [0, 188, 212] : (d.role === "Manager" ? [28, 192, 138] : [245, 123, 58]), //should be champagne #FFF7F0
      getLineColor: d => d.role === "Admin" ? [0, 188 - offset, 212 - offset] : (d.role === "Manager" ? [28 - offset, 192 - offset, 138 - offset] : [245 - offset, 123 - offset, 58 - offset])
    });

    const lineLayer = new LineLayer({
        id: "line-layer",
        coordinateSystem: COORDINATE_SYSTEM.IDENTITY,
        data: flinks,
        getWidth: 4,
        opacity: 0.6, //so we can differentiate overlapping connections
        getSourcePosition: d => [d.source.x, d.source.y, 0],
        getTargetPosition: d => [d.target.x, d.target.y, 0],
        getColor: d => [250,243,256], //<- champagne ,[95, 40, 94]
    });

    // For names of users to go over respective nodes
    const textLayer = new TextLayer({
      id: "text-layer",
      data: fnode,
      characterSet: 'auto',
      getText: d => d.name,
      getPosition: d => {
        console.log("Text Pos: ", [d.x, d.y]);
        return [d.x, d.y, 0]; //same position as the coorelating node
      },
      getColor: d => [250,243,256],
      setSize: d => 20
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

    // Purpose: Get node information
    // Creates a list of nodes to use for deck.gl graph
    // Format: {id, name, radius, role}
    //  id: id of user
    //  name: name of user for text layer
    //  radius: determines size of node
    //  role: what position the user has for colored node
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

    // Purpose: Get the names of users who have no connections
    const populateToBeConnectedList = () => {

      axios.get(lone_nodes_url)
      .then(response => {
          console.log(response.data.result);
          setListOfNames(response.data.result);

          var fullName = [];
          listOfNames.forEach(function (person) {
            fullName.push(person.first_name + " " + person.last_name);
          });
          setListOfFullNames(fullName);
      })
      .catch(error => {
          console.log("ERROR" + error);
      });


      //JSON.parse(returnedFromDBcall);
      /* setListOfNames([{id:1, name: "Peter", lastname: "Son"},
      {id:2, name: "Lucy", lastname: "Son"},
      {id:3, name: "Phil", lastname: "Yu"},
      {id:4, name: "Abby", lastname: "Pete"},
      ]); */

      /* let temp_list = [];
      listOfNames.map(person => (
        //console.log("PERSON: ", person)
        temp_list.push(person.name + person.lastname)
      ))
      */
      

      /* onsole.log("TEMP NAMES LIST:", temp_list); */
      /* setListOfFullNames(["Fake Name", "Other Human", "Not Working"]); */
      
    }

    // Purpose: Find who talks to who
    // Get send id and recieve id to determine node links
    // Format: {source, target}
    //  source: The start of the link
    //  target: The end of the link
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
      populateToBeConnectedList();

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
    const view = new OrthographicView(); //d3-force

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
        <div className="h-screen" style={{ backgroundImage: `url(${background})` }}>
          <div className="pt-6 pl-6">
            <div className="z-10 fixed">
              <div className="flex space-x-4">
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
          </div>
          <div className="box">
            <div className="stat-text">
              Legend
              <div className="legend">
                <div className="text-[#00BCD4]">Admin</div>
                <div className="text-[#1CC08A]">Manager</div>
                <div className="text-[#F57B3A]">Employee</div>
              </div>
            </div>
          </div>
          {/* Comment lines 344-351 out so scrolling isn't buggy */}
          <div class="contain-box">
            <div>
            <DeckGL
            views={view}
            initialViewState={myViewState}
            controller={{scrollZoom: true, dragPan: true}}
            layers={renderLayers()}
            />
            </div>
          </div> 
           <div>
            <div className="admin-grid">
              <div className="stat-container">
                <div className="stat1">
                  <div className="stat-text">
                    All Messages
                    <p className="font-bold">{allMessages}</p>
                  </div>
                </div>
                <div className="stat2">
                  <div className="stat-text">
                    All Kudos
                    <p className="font-bold">{allKudos}</p>
                  </div>
                </div>
                <div className="stat3">
                  <div className="stat-text">
                    All Users
                    <p className="font-bold">{allUsers}</p>
                  </div>
                </div>  
                <div className="stat4">
                  <div className="stat-text">
                    Letters/Person
                    <p className="font-bold">{ratio}</p>
                  </div>
                </div>
                <div className="border-box">
                  <div className="wrapper-box">
                    <div className="list-box">
                      <div className="stat-text-op">
                      Yet To Connect...
                      </div>
                      <div className="node-search">
                        <Autocomplete
                            className='bg-champagne rounded-lg'
                            fullWidth={true}
                            disablePortal
                            options={listOfFullNames}
                            getOptionLabel={(option) => option || ""}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params}/>}
                            onChange={(event, value) => setReceipient(value["id"])}
                        />
                        <div className="scrolling-list">
                          <div className="stat-text-op">
                            <div>
                              {listOfNames.map((person, index) => {
                                return (
                                  <div key={index}>
                                    <h2>{person.first_name} {person.last_name}</h2>
                                    <hr />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </main>
  );

}