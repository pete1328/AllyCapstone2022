import { React, useState, useEffect } from "react";
// import { appTheme } from "../components/Palette";
// import { ThemeProvider, CssBaseline } from "@mui/material";
// import {forceSimulation, forceCenter, forceLink, forceCollide, forceManyBody} from "d3-force";
import { Link, useLocation } from "react-router-dom";
// import { Button } from "@mui/material";
import { DashboardButton, LogoutButton } from "../components/Button";
import "../App.css";
import DeckGL, { OrthographicView } from "deck.gl"; //d3-force
import { DataLayers } from "../components/DataLayers"; //d3-force
import axios from "axios";

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

    // api urls
    const all_appreciations_url = "http://localhost:3001/api/appreciations/all";
    const all_users_url = "http://localhost:3001/api/allusers";

    let location = useLocation();

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
      axios.get(all_users_url)
      .then(response => {
          let table_len = 0;
          table_len = response.data.users.length;
          setAllUsers(table_len);
      })
      .catch(error => {
          console.log(error);
      });
    }

    // Purpose: Letters per person calculation
    const populateRatio = () => {

      let urls = [all_appreciations_url, all_users_url];

      // Reference: https://blog.logrocket.com/using-axios-all-make-concurrent-requests/
      axios.all(urls.map((url) => axios.get(url)))
      .then(axios.spread((...responses) => {

          // Getting total amount of letters sent
          let appreciation_len = 0;
          appreciation_len = responses[0].data.kudos.length;

          // Getting the total amount of users
          let user_len = 0;
          user_len = responses[1].data.users.length;

          // Getting the letters per person
          let stat = 0;
          stat = appreciation_len / 6;

          setRatio(stat.toFixed(1));
      }))
      .catch(error => {
          console.log(error);
      });
    }

    // Purpose: Update the side bar content
    const updateContent = () => {
      populateAllLettersSent();
      populateAllKudosSent();
      populateAllUsers();
      populateRatio();
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions()); 
    const view = new OrthographicView({ fov: 50 }); //d3-force

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <div className="flex h-screen w-screen">
          <div className="w-full bg-champange">
            <div className="z-10 fixed flex items-center justify-between pt-4">
              <div className="flex space-x-4 justify-end pt-8 pl-12 p">
                <Link to="/login">
                  <LogoutButton/>
                </Link>
                <Link to="/dashboard">
                    <DashboardButton/>
                </Link>
              </div>
            </div>
            <div className="stat-page-grid">
              <div className="stat-grid-graph">
                <div className="mt-28 mx-12 py-96 bg-seafoam border-plum drop-shadow-2xl border-4">
                <DeckGL
                views={view}
                initialViewState={useState({
                  positon: [0, 0, 0],
                  width: window.innerWidth,
                  height: window.innerHeight,
                  target: [0, 0],
                  zoom: 1
                })}
                controller={true}
                layers={DataLayers()}
                />
                </div>
              </div>
              <div className="stat1">
                <p>All Messages: {allMessages}</p>
              </div>
              <div className="stat2">
                <p>All Kudos: {allKudos}</p>
              </div>
              <div className="stat3">
                <p>All Users: {allUsers}</p>
              </div>
              <div className="stat4">
                <p>Ratio: {ratio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
  );

}