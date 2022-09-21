import React from "react";
import { appTheme } from "../assets/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
import allyLogo from '../assets/allyLogoBlack.png';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { KudosButton, LogoutButton } from "../components/Button";
import { kudosSentData, kudosRecievedData, usageLegend, statsLegend } from "../components/TestData";
import { 
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  HorizontalBarSeries,
  DiscreteColorLegend
  } from "react-vis";

const sidebarOptions = {
  Recieved: 'recieved',
  Sent: 'sent',
}

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Sara',
      kudosTotal: 3600,
      kudosEarned: 4800,
      kudosRedeemed: 1200,
      kudosAllocated: 2400,
      sidebarState: sidebarOptions.Recieved,
    };
  }

  render() {
    return (
      <main>
        <div className="w-full flex bg-blue-700">
          <div className="w-full bg-[#F0EFEF] pb-44">
            <div className="flex items-center justify-between pt-4">
              <div className="flex ml-12 pt-4">
                <img className="w-16 h-auto mt-1" src={allyLogo} alt="Logo"/>
                <h1 className="ml-2 font-bold text-4xl">kudos</h1>
              </div>
              <div className="flex space-x-4 justify-end pr-4">
                <Link to="/login">
                  <LogoutButton/>
                </Link>
              </div>
            </div>
            <div className=" pt-8 pb-8 w-full flex items-center">
              <div className="border-blueberry border-4 bg-white w-[80px] h-[80px] rounded-full ml-12">
                <p className="ml-5 mt-3 text-xs font-poppins">Insert image here</p>
              </div>
              <div>
                <div className="font-poppins font-regular text-gray-500 mx-auto lg:text-2xl xl:text-3xl ml-4 flex space-x-1">
                  <h1 className=" text-plum font-poppins font-bold">Hi {this.state.name}, </h1>
                  <h1 className="text-black">Welcome Back!</h1>
                </div>
                <h1 className="ml-4 font-poppins font-regular mx-auto lg:text-base xl:text-xl text-black">This is your Kudos Dashboard</h1>
              </div>
            </div>
            <div className="flex pl-12 pr-[53px] -space-x-1">
              <div className=" bg-white border-[#D6D6D6] border-2 w-full">
                <div className="flex justify-evenly p-4">
                  <div className="lg:pt-12 xl:pt-6">
                    <p className="mx-auto w-full lg:text-base xl:text-xl font-poppins font-regular">Your Kudos Balance</p>
                    <p className="mx-auto lg:text-6xl xl:text-7xl font-poppins font-medium">{this.state.kudosTotal}</p>
                  </div>
                </div>
              </div>
              <div className="mx-auto container bg-[#FFFFFF] border-[#D6D6D6] border-2 flex items-center p-6">
                <div className="flex space-x-6">
                  <div>
                    <p className="mx-auto lg:text-2xl xl:text-3xl font-poppins font-bold pb-2 leading-normal">Spread some joy by appreciating someone</p>
                    <Link to="/kudos">
                      <KudosButton/> 
                    </Link>
                  </div>
                  <div className="container bg-[#FFFFFF] border-blueberry border-2 rounded-lg w-auto">
                    <p className="p-8 font-poppins">Insert image here</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pl-12 pr-14 pt-8 pb-32 space-x-8">
              <div className="w-full">
                <p className="mx-auto lg:text-base xl:text-xl font-poppins font-bold">Statistics</p>
                <div className=" bg-[#FFFFFF] border-[#D6D6D6] border-2 p-4">
                <XYPlot
                  width={300}
                  height={200}
                  yDomain={[-200, 200]}
                >
                  <VerticalBarSeries data={kudosRecievedData} color="#1C988A" />
                  <VerticalBarSeries data={kudosSentData} color="#CB3974"/>
                </XYPlot>
                <DiscreteColorLegend orientation="horizontal" width={300} items={statsLegend} />
                </div>
              </div>
              <div className="w-full">
                <p className="mx-auto lg:text-base xl:text-xl font-poppins font-bold">Kudos Usage</p>
                <div className=" bg-[#FFFFFF] border-[#D6D6D6] border-2 p-4 pt-[116px]">
                  <XYPlot width={300} height={100} stackBy="x">
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <HorizontalBarSeries data={[{y: 0, x: this.state.kudosAllocated}]} color="#1C988A"/>
                    <HorizontalBarSeries data={[{y: 0, x: this.state.kudosEarned}]} color="#CB3974"/>
                  </XYPlot>
                  <DiscreteColorLegend orientation="horizontal" width={300} items={usageLegend} />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white">
            <div className="mx-4 mt-4 flex">
            <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
              <Button 
              variant="contained"
              color="blueberry"
              size="small"
              onClick={() => {this.setState({sidebarState: sidebarOptions.Recieved})}}
              >
                Recieved Appreciations
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
              <Button 
              variant="outlined"
              color="blueberry"
              size="small"
              onClick={() => {this.setState({sidebarState: sidebarOptions.Sent})}}
              >
                Sent Appreciations
              </Button>
            </ThemeProvider>
            </div>
            <div className="w-full flex justify-center pt-4 font-poppins">
              {this.state.sidebarState === sidebarOptions.Recieved && 
                <div>Recieved</div>
              }
              {this.state.sidebarState === sidebarOptions.Sent && 
                <div>Sent</div>
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
}