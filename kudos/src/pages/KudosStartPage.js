import { LogoutButton } from "../components/Button";
import { WordWizardHelpButton } from "../components/Button";
import { CreateMessageButton } from "../components/Button";
import { Link } from "react-router-dom";

export function KudosStartPage() {
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
              <Link to="/">
                <LogoutButton/>
              </Link>
            </nav>
          </div>
        </main>
      </>
    );
  }