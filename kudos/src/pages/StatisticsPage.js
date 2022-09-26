import { React, useState, useEffect } from "react";
// import { appTheme } from "../components/Palette";
// import { ThemeProvider, CssBaseline } from "@mui/material";
import {forceSimulation, forceCenter, forceLink, forceCollide, forceManyBody} from "d3-force"; //Abby 9/25
import allyLogo from '../assets/allyLogoBlack.png';
import { Link } from "react-router-dom";
// import { Button } from "@mui/material";
import { DashboardButton, LogoutButton } from "../components/Button";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  export function StatisticsPage() {
    // const [name] = useState('Sara');

    //d3: nodes can be any object as long as it has a unique id
    //  NODES are each employee from database (unique ID == primary ID)
    //  Category: 0- employee, 1- manager
    const nodes = [
      {"id": "Alice", "category": 1},
      {"id": "Bob", "category": 0},
      {"id": "Carol", "category": 0}
    ];
    // const links = [
    //   {"source": 0, "target": 1}, // Alice → Bob
    //   {"source": 1, "target": 2} // Bob → Carol
    // ];

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return (
      <main>
        <div className="flex bg-blue-700">
          <div className="w-full bg-[#F0EFEF]">
            <div className="flex items-center justify-between pt-4">
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
            <div id="networkGraph">
              <forceSimulation
              // Define forces for d3-force graph ...
              f={forceSimulation(nodes) //Abby 9/25
              .force("link", forceLink().id(function(d) { return d.id; }))
              .force('charge', forceManyBody() 
                .strength(-1900)
                .theta(0.5)
                .distanceMax(1500))
              .force('collision', forceCollide().radius(function(d) {
                    return d.radius
                  })) 
              .force("center", forceCenter(windowDimensions.width / 2, windowDimensions.height / 2))}
              //</div>not showing up right now though... 9/25 Abby
              >              
              </forceSimulation>
            </div>
          </div>
        </div>
      </main>
  );

}