import { LogoutButton } from "../components/Button";
import { CreateMessageButton } from "../components/Button";
import { Link } from "react-router-dom";

export function KudosWizardPage() {
    return (
      <>
        <main>
          <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
            <p className="text-3xl text-gray-700 font-bold mb-5">
              Ally Kudos !
            </p>
            <p className="text-gray-500 text-lg pb-4">
              Brighten Someone's Day
            </p>
            <p>
              I am here to do all of the work for you now...
            </p>
            <nav>
              <div className="space-x-4 py-6">
                <Link to="/kudos-drafted">
                  <CreateMessageButton/>
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