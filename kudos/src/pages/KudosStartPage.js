import { HomeButton, LogoutButton } from "../components/Button";
import { WordWizardHelpButton } from "../components/Button";
import { CreateMessageButton } from "../components/Button";
import { Link } from "react-router-dom";

export function KudosStartPage() {
    return (
      <>
        <main>
          <div className="w-full flex">
            <div className="w-full container bg-[#F0EFEF]">
            <div className="w-50 container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
              <div className="flex items-center justify-between pt-4">
                <h1 className="pl-12 font-bold text-xl">ally kudos</h1>
                <div className="flex space-x-4 justify-end pr-4">
                  <Link to="/dashboard">
                    <HomeButton/>
                  </Link>
                  <Link to="/login">
                    <LogoutButton/>
                  </Link>
                </div>
              </div>
            <p className="text-3xl text-gray-700 font-bold mb-5">
              Ally Kudos !
            </p>
            <p className="text-gray-500 text-lg pb-4">
              Brighten Someone's Day
            </p>
            <p>
              Fill in the blanks** and click draft message button when ready
              <b> OR</b> ask our gratitude wizard to help find the right words.
            </p>
            <nav>
              <Link to="/ml-message-start">
                <WordWizardHelpButton/>
              </Link>
              <Link to="/kudos-drafted">
                <CreateMessageButton/>
              </Link>
            </nav>
          </div>
          </div>
          </div>
        </main>
      </>
    );
  }