import './App.css';
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from './pages/DashboardPage';
import { KudosStartPage } from './pages/KudosStartPage';
import { KudosWizardPage } from './pages/KudosWizardPage';
import { KudosMessagePage } from './pages/KudosMessagePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="kudos-start" element={<KudosStartPage />} />
        <Route path="ml-message-start" element={<KudosWizardPage />} />
        <Route path="kudos-drafted" element={<KudosMessagePage />} />
      </Routes>
    </div>
  );
}

export default App;
