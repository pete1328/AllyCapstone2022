import { HomeButton } from "../components/Button";
import { DashboardButton } from "../components/Button";
import { HolderButton } from "../components/Button";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
      <>
        <main>
          <div className="flex items-center justify-between pt-4">
            <h1 className="pl-6 font-bold text-xl">ally kudos</h1>
            <div className="flex space-x-4 justify-end pr-4">
              <Link to="/">
                <HolderButton/>
              </Link>
            </div>
          </div>
          <h2 className="font-medium text-gray-500 text-xl mb-10">Log In</h2>
          <div className="bg-[#D6D6D6] m-5 p-5">
          <h2 className="font-medium text-gray-500 text-xl mb-10">Good to see you again!</h2>
          <form className="items-center">
            <label className="flex justify-evenly">Enter your username:
              <input type="text" className="bg-[#FFFFFF] border-[#D6D6D6] border-2"/>
            </label>
            <label className="flex justify-evenly">Enter your password:
              <input type="text" className="bg-[#FFFFFF] border-[#D6D6D6] border-2"/>
            </label>
          </form>
          <nav className="m-5">
            <Link to="/dashboard">
              <DashboardButton/>
            </Link>
          </nav>
          <p>Forgot password?</p>
          </div>
        </main>
      </>
    );
  }