import './App.css';
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { KudosPage } from "./pages/KudosPage"
import { Routes, Route } from "react-router-dom";
import { StatisticsPage } from './pages/StatisticsPage';

function App() {

  //const [validation, setValidation] = useState(); //TBD - call the API to set validation with the return value
  //if(!validation)
  //{
  //  return <Route path="login" element={<LoginPage />} setValidation={setValidation}/> //so no one can access other pages unless logged in
  //    // also pass 'setValidation' function into the LoginPage component
  //}

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
