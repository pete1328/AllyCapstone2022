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
          <h2 className="ml-6 font-medium text-gray-500 text-xl mb-10">Log In</h2>
          <div className="bg-[#D6D6D6] m-5 p-5">
          <h2 className="font-medium text-gray-500 text-xl mb-10 flex justify-center">Good to see you again!</h2>
          <div className="flex justify-center">
            <form>
              <div className="flex">
                <p>Enter your username:</p>
                <input type="text" className="bg-[#FFFFFF] border-[#D6D6D6] border-2"/>
              </div>
              <div className="flex space-x-0.5">
                <p>Enter your password:</p>
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