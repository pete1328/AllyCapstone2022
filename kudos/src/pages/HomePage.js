import { KudosButton, LogoutButton, ManagePointsButton, RedeemButton } from "../components/Button";
import { Link } from "react-router-dom";
import { Button, Divider} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "../assets/Palette";
import React from "react";

const SidebarOptions = {
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
      sidebarState: SidebarOptions.Sent,
    };
  }

  render() {
    return (
      <main>
        <div className="w-full flex bg-blue-700">
          <div className="w-full bg-[#F0EFEF]">
            <div className="flex items-center justify-between pt-4">
              <h1 className="pl-12 font-bold text-xl">ally kudos</h1>
              <div className="flex space-x-4 justify-end pr-4">
                <ManagePointsButton/>
                <Link to="/login">
                  <LogoutButton/>
                </Link>
              </div>
            </div>
            <div className=" pt-8 pb-8 w-full flex items-center">
              <div className="border-[#9B9B9B] border-4 bg-white w-[80px] h-[80px] rounded-full ml-12">
                <p className="ml-5 mt-3 text-xs">Insert image here</p>
              </div>
              <div>
                <div className="font-regular text-gray-500 mx-auto lg:text-2xl xl:text-3xl ml-4 flex space-x-1">
                  <h1 className="font-bold text-black">Hi {this.state.name}, </h1>
                  <h1 className="text-black">Welcome Back!</h1>
                </div>
                <h1 className="ml-4 font-regular mx-auto lg:text-base xl:text-xl text-black">This is your Kudos Dashboard</h1>
              </div>
            </div>
            <div className="flex pl-12 pr-[53px] -space-x-1">
              <div className="container bg-[#FFFFFF] border-[#D6D6D6] border-2">
                <div className="flex justify-evenly items-center py-4 p-4">
                  <div>
                    <p className="mx-auto lg:text-base xl:text-xl font-regular">Your Kudos Balance</p>
                    <p className="mx-auto lg:text-4xl xl:text-5xl font-medium">{this.state.kudosTotal}</p>
                  </div>
                  <RedeemButton/>
                </div>
                <Divider variant="middle"/>
                <div className="flex justify-evenly pt-8 pb-6">
                  <div>
                      <p className="mx-auto lg:text-xs xl:text-xl font-regular">Total Kudos Earned</p>
                      <p className="mx-auto lg:text-2xl xl:text-[32px] font-medium">{this.state.kudosEarned}</p>
                  </div>
                  <Divider orientation="vertical" flexItem/>
                  <div>
                      <p className="mx-auto lg:text-xs xl:text-xl font-regular">Kudos Redeemed</p>
                      <p className="mx-auto lg:text-2xl xl:text-[32px] font-medium">{this.state.kudosRedeemed}</p>
                  </div>
                </div>
              </div>
              <div className="mx-auto container bg-[#FFFFFF] border-[#D6D6D6] border-2 flex items-center px-4">
                <div className="flex space-x-6">
                  <div>
                    <p className="mx-auto lg:text-2xl xl:text-3xl font-bold pb-4 leading-normal">Spread some joy by appreciating someone</p>
                    <Link to="/kudos-start">
                      <KudosButton/> 
                    </Link>
                  </div>
                  <div className="container bg-[#FFFFFF] border-[#D6D6D6] border-2 rounded-lg w-auto">
                    <p className="p-8">Insert image here</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pl-12 pr-14 pt-8 pb-32 space-x-8">
              <div className="w-full">
                <p className="mx-auto lg:text-base xl:text-xl font-bold">Statistics</p>
                <div className="container bg-[#FFFFFF] border-[#D6D6D6] border-2">
                  <p className="p-12">Insert graph here</p>
                </div>
              </div>
              <div className="w-full">
                <p className="mx-auto lg:text-base xl:text-xl font-bold">Kudos Usage</p>
                <div className="container bg-[#FFFFFF] border-[#D6D6D6] border-2">
                  <p className="p-12">Insert graph here</p>
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
              color="gray"
              size="small"
              onClick={() => {this.setState({sidebarState: SidebarOptions.Recieved})}}
              >
                Recieved Appreciations
              </Button>
            </ThemeProvider>
            <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
              <Button 
              variant="outlined"
              color="gray"
              size="small"
              onClick={() => {this.setState({sidebarState: SidebarOptions.Sent})}}
              >
                Sent Appreciations
              </Button>
            </ThemeProvider>
            </div>
            <div className="w-full flex justify-center pt-4">
              {this.state.sidebarState === SidebarOptions.Recieved && 
                <div>Recieved</div>
              }
              {this.state.sidebarState === SidebarOptions.Sent && 
                <div>Sent</div>
              }
            </div>
          </div>
        </div>
      </main>
    );
  }
}