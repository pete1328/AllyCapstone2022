import './App.css';
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { KudosPage } from "./pages/KudosPage"
import { Routes, Route } from "react-router-dom";
import { StatisticsPage } from './pages/StatisticsPage';
import { useState } from "react"; // 9/28 Abby

function App() {

  const [validation, setValidation] = useState(); //TBD - call the API to set validation with the return value
  if(!validation)
  {
    //TRIED...return <LoginPage setValidation={setValidation} /> //seems to restrict some, but IDK if correct yet
    <Route path="login" element={<LoginPage setValidation={setValidation}/>} /> //so no one can access other pages unless logged in
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="dashboard" element={<HomePage />} />
      <Route path="extend-dashboard" element={<StatisticsPage />} />
      <Route path="kudos" element={<KudosPage />} />
    </Routes>
  );
}

export default App;

//CITE - https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications