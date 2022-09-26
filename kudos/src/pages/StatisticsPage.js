import { React, Component, useState, useEffect } from "react";
import { appTheme } from "../components/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
//ERROR - import {d3} from "d3-force"; Abby 9/25
import allyLogo from '../assets/allyLogoBlack.png';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DashboardButton, LogoutButton } from "../components/Button";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  export function StatisticsPage() {
    const [name] = useState('Sara');
    const [node1] = useState(10);
    const [node2] = useState(20);
    const [node3] = useState(40);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    //d3-force try: const f = forceSimulation([node1, node2, node3]) Abby 9/25

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
          </div>
        </div>
      </main>
  );
}