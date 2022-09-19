import { LogoutButton } from "../components/Button";
import { SendMessageButton } from "../components/Button";
import { Link } from "react-router-dom";

export function KudosMessagePage() {
    return (
      <>
        <main>
          <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <p className="text-3xl text-gray-700 font-bold mb-5">
              Hi <i>name</i>, how does your message look?
            </p>
            <p className="text-gray-500 text-lg pb-4">
              Good to send? :) If so, hit that button!
            </p>
            <nav>
              <div className="space-x-4 py-6">
                <Link to="/dashboard">
                  <SendMessageButton/>
                </Link>
                <Link to="/">
                  <LogoutButton/>
                </Link>
              </div>
            </nav>
          </div>
        </main>
      </>
    );
  }