import { React, useState, useEffect } from "react";
// import { appTheme } from "../components/Palette";
// import { ThemeProvider, CssBaseline } from "@mui/material";
import {forceSimulation, forceCenter, forceLink, forceCollide, forceManyBody} from "d3-force"; //Abby 9/25
import allyLogo from '../assets/allyLogoBlack.png';
import { Link } from "react-router-dom";
// import { Button } from "@mui/material";
import { DashboardButton, LogoutButton } from "../components/Button";
import DeckGL, { OrthographicView } from "deck.gl"; //d3-force
import renderLayers from "../components/DataLayers"; //d3-force

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  export function StatisticsPage() {
    // const [name] = useState('Sara');

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions()); 
    const view = new OrthographicView({ fov: 50 }); //d3-force

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <main>
        <div className="flex h-screen w-screen">
          <div className="w-full bg-champange">
            <div className="z-10 fixed flex items-center justify-between pt-4">
              <div className="flex ml-12 pt-4">
                <img className="w-16 h-auto mt-1" src={allyLogo} alt="Logo"/>
                <h1 className="ml-2 font-bold text-4xl">kudos</h1>
              </div>
              <div className="flex space-x-4 justify-end pr-4">
                <Link to="/login">
                  <LogoutButton/>
                </Link>
                <Link to="/dashboard">
                    <DashboardButton/>
                </Link>
              </div>
            </div>
            <div className="z-0 fixed place-self-center m-20 p-40 bg-seafoam border-plum border-4">
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
                layers={renderLayers()}
              />
            </div>
          </div>
        </div>
      </main>
  );

}