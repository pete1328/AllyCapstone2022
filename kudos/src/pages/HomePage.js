import { KudosButton, LoginButton, LogoutButton, ManagePointsButton, RedeemButton } from "../components/Button";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

export function HomePage() {
    return (
      <>
        <main>
          <div className="w-full flex">
            <div className="w-full container bg-[#F0EFEF]">
              <div className="flex items-center justify-between pt-4">
                <h1 className="pl-12 font-bold text-xl">ally kudos</h1>
                <div className="flex space-x-4 justify-end pr-4">
                  <ManagePointsButton/>
                  <LogoutButton/>
                </div>
              </div>

              <div className=" pt-8 pb-8 w-fill flex items-center">
                <div className="border-[#9B9B9B] border-4 bg-white w-[80px] h-[80px] rounded-full ml-12"/>
                <div>
                  <div className="font-regular text-gray-500 text-3xl ml-4 flex space-x-1">
                    <h1 className="font-bold">Hi name, </h1>
                    <h1>Welcome Back!</h1>
                  </div>
                  <h1 className="font-regular text-xl">This is your Kudos Dashboard</h1>
                </div>
                <nav className="ml-4">
                  <Link to="/login">
                    <LoginButton/>
                  </Link>
                </nav>
              </div>
              <div className="flex pl-12 pr-[53px] -space-x-1">
                <div className="container bg-[#FFFFFF] border-[#D6D6D6] border-2">
                  <div className="flex justify-evenly items-center py-4 p-4">
                    <div>
                      <p className="text-xl font-regular">Your Kudos Balance</p>
                      <p className="text-5xl font-medium">3,600</p>
                    </div>
                    <RedeemButton/>
                  </div>
                  <Divider variant="middle"/>
                  <div className="flex justify-evenly pt-8 pb-6">
                    <div>
                        <p className="text-xl font-regular">Total Kudos Earned</p>
                        <p className="text-[32px] font-medium">4,800</p>
                    </div>
                    <Divider orientation="vertical" flexItem/>
                    <div>
                        <p className="text-xl font-regular">Kudos Redeemed</p>
                        <p className="text-[32px] font-medium">1,200</p>
                    </div>
                  </div>
                </div>
                <div className="container bg-[#FFFFFF] border-[#D6D6D6] border-2 p-6">
                  <div className="flex space-x-6">
                    <div>
                      <p className="text-[32px] font-bold w-full pb-4">Spread some joy by appreciating someone</p>
                      <KudosButton/>
                    </div>
                    <div className="container bg-[#FFFFFF] border-[#D6D6D6] border-2 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }