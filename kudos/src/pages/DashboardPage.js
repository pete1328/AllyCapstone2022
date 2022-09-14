import { LogoutButton } from "../components/Button";
import { KudosButton } from "../components/Button";
import { Link } from "react-router-dom";

export function DashboardPage() {
    return (
      <>
        <main>
          <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <p className="text-3xl text-gray-700 font-bold mb-5">
              Hi <i>name</i>, welcome back!
            </p>
            <p className="text-gray-500 text-lg pb-4">
              React, React Router, Material UI, and Tailwind CSS in action
            </p>
            <nav>
              <Link to="/kudos-start">
                <KudosButton/> 
              </Link>
              <Link to="/">
                <LogoutButton/>
              </Link>
            </nav>
          </div>
        </main>
      </>
    );
  }