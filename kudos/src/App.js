import './App.css';
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { KudosPage } from "./pages/KudosPage"
import { Routes, Route } from "react-router-dom";
import { StatisticsPage } from './pages/StatisticsPage';
import { useState } from "react"; // 9/28 Abby
import { User } from './components/User';
import axios from 'axios';
import { AwardsPage } from './pages/AwardsPage';
import { database_prefix } from '.';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [users, setUsers] = useState([]);

  const url = database_prefix + "/api/user/validate";

  function updateUser(userObj) {
    var map = new Map(Object.entries(JSON.parse(JSON.stringify(userObj[0]))));
    var user = new User(
      map.get("user_id"),
      map.get("username"),
      map.get("password"),
      map.get("first_name"),
      map.get("last_name"),
      map.get("email"),
      map.get("position"),
      map.get("reports_to"),
      map.get("sent"),
      map.get("received"),
    );
    setUser(user);
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  function updateUsers(usersObj) {
    setUsers(usersObj);

    axios.get(url, { params: {
      username: user.username,
      password: user.password
    }}).then(response => {
      updateUser(response.data.user);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage user={user} onChange={updateUser}/>} />
      <Route path="login" element={<LoginPage user={user} onChange={updateUser}/>} />
      <Route path="dashboard" element={<HomePage user={user} onChange={updateUsers}/>} />
      <Route path="awards" element={<AwardsPage user={user} onChange={updateUser}/>} />
      <Route path="extend-dashboard" element={<StatisticsPage user={user} users={users}/>} />
      <Route path="kudos" element={<KudosPage user={user} users={users}/>} />
    </Routes>
  );
}

export default App;

//CITE - https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications