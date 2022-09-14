import './App.css';
import { HomeButton, LoginButton } from "./components/button";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
}

function Home() {
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

function Login() {
  return (
    <>
      <main>
        <h2 className="py-6">Welcome to the login page!</h2>
        <nav>
          <Link to="/">
            <HomeButton/>
          </Link>
        </nav>
      </main>
    </>
  );
}

export default App;
