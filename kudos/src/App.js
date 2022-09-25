import './App.css';
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { KudosPage } from "./pages/KudosPage"
import { Routes, Route } from "react-router-dom";
import { StatisticsPage } from './pages/StatisticsPage';

function App() {
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
