import { React } from "react";
import { DashboardButton } from "../components/Button";
import { HolderButton } from "../components/Button";
import { Link } from "react-router-dom";
import allyLogo from '../assets/allyLogoBlack.png';

export function LoginPage() {
    return (
      <>
        <main className="bg-champange">
          <div className="flex items-center justify-between pt-4">
            <div className="flex ml-12 pt-4">
              <img className="w-16 h-auto mt-1" src={allyLogo} alt="Logo"/>
              <h1 className="ml-2 font-bold text-4xl">kudos</h1>
            </div>
            <div className="flex space-x-4 justify-end pr-4">
              <Link to="/">
                <HolderButton/>
              </Link>
            </div>
          </div>
          <h2 className="ml-12 font-medium text-plum font-poppins text-xl mt-1 mb-10">Log In</h2>
          <div className="border-blueberry border-4 bg-white m-5 p-5 w-80sh">
          <h2 className="text-plum font-poppins font-bold text-xl mb-10 flex justify-center">Good to see you again!</h2>
          <div className="flex justify-center">
            <form>
              <div className="flex">
                <p>Username:</p>
                <input type="text" className="bg-[#FFFFFF] border-[#D6D6D6] border-2"/>
              </div>
              <div className="flex space-x-1">
                <p>Password:</p>
                <input type="text" className="bg-[#FFFFFF] border-[#D6D6D6] border-2"/>
              </div>
            </form>
          </div>
          <nav className="m-5 flex justify-center">
            <Link to="/dashboard">
              <DashboardButton/>
            </Link>
          </nav>
          <p className="flex justify-center">Forgot password?</p>
          </div>
        </main>
      </>
    );
  }