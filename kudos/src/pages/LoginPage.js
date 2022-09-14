import { HomeButton } from "../components/button";
import { Link } from "react-router-dom";

export function LoginPage() {
    return (
      <>
        <main>
          <h2 className="py-6 text-xl font-medium">Welcome to the login page!</h2>
          <nav>
            <Link to="/">
              <HomeButton/>
            </Link>
          </nav>
        </main>
      </>
    );
  }