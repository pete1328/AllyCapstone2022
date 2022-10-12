import './App.css';
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { KudosPage } from "./pages/KudosPage"
import { Routes, Route } from "react-router-dom";
import { StatisticsPage } from './pages/StatisticsPage';
import { useState } from "react"; // 9/28 Abby
import { User } from './components/User';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  function updateUser(userObj) {
    var map = new Map(Object.entries(JSON.parse(JSON.stringify(userObj[0]))));
    var user = new User(
      map.get("user_id"),
      map.get("username"),
      map.get("password"),
      map.get("first_name"),
      map.get("last_name"),
      map.get("position"),
      map.get("reports_to"),
      map.get("balance"),
    );
    setUser(user);
    window.localStorage.setItem('user', JSON.stringify(user));
}

  return (
    <Routes>
      <Route path="/" element={<LoginPage user={user} onChange={updateUser}/>} />
      <Route path="login" element={<LoginPage user={user} onChange={updateUser}/>} />
      <Route path="dashboard" element={<HomePage user={user} onChange={updateUser}/>} />
      <Route path="extend-dashboard" element={<StatisticsPage user={user} onChange={updateUser}/>} />
      <Route path="kudos" element={<KudosPage user={user} onChange={updateUser}/>} />
    </Routes>
  );
}

export default App;

//CITE - https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications