import { LoginButton } from "../components/button";
import { Link } from "react-router-dom";

export function Home() {
    return (
      <>
        <main>
          <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <p className="text-3xl text-gray-700 font-bold mb-5">
              Welcome!
            </p>
            <p className="text-gray-500 text-lg pb-4">
              React, React Router, Material UI, and Tailwind CSS in action
            </p>
            <nav>
              <Link to="/login">
                <LoginButton/>
              </Link>
            </nav>
          </div>
        </main>
      </>
    );
  }