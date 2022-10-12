import './App.css';
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { KudosPage } from "./pages/KudosPage"
import { Routes, Route } from "react-router-dom";
import { StatisticsPage } from './pages/StatisticsPage';
import { useState } from "react"; // 9/28 Abby

export class User {
  constructor(id, user, pass, first, last, pos, rep, bal) {
    this.user_id = id;
    this.username = user;
    this.password = pass;
    this.first_name = first;
    this.last_name = last;
    this.position = pos;
    this.reports_to = rep;
    this.balance = bal;
  }
}

function App() {

  // const [validation, setValidation] = useState(); //TBD - call the API to set validation with the return value
  // if(!validation)
  // {
  //   //TRIED...return <LoginPage setValidation={setValidation} /> //seems to restrict some, but IDK if correct yet
  //   <Route path="login" element={<LoginPage setValidation={setValidation}/>} /> //so no one can access other pages unless logged in
  // }

  const [user, setUser] = useState(new User());

  function updateUser(userObj) {
    var map = new Map(Object.entries(JSON.parse(JSON.stringify(userObj[0]))));
    setUser(new User(
      map.get("user_id"),
      map.get("username"),
      map.get("password"),
      map.get("first_name"),
      map.get("last_name"),
      map.get("position"),
      map.get("reports_to"),
      map.get("balance"),
    ))
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