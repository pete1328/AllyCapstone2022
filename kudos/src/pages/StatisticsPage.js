import { React, useState, useEffect } from "react";
import { appTheme } from "../components/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
import allyLogo from '../assets/allyLogoBlack.png';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DashboardButton, KudosButton, LogoutButton } from "../components/Button";
import { kudosSentData, kudosRecievedData, usageLegend, statsLegend } from "../components/TestData";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }
  
  export function StatisticsPage() {
    const [name] = useState('Sara');
    const [kudosTotal] = useState(3600);
    const [kudosEarned] = useState(4800);
    const [kudosAllocated] = useState(2400);
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
          </div>
        </div>
      </main>
  );
}