import { React, useState } from "react";
import { Button, TextField } from "@mui/material";
import { HolderButton } from "../components/Button";
import { appTheme } from "../components/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import allyLogo from '../assets/allyLogoBlack.png';
import { CreateAccount } from "../components/CreateAccount";
import axios from "axios";

const loginResults = {
  nosubmission: '',
  noconnection: 'Unable to establish connection to server',
  incorrect: 'Your username or password is incorrect'
}

export function LoginPage(props) {

  // const [attemptsTotal] = useState(0); update every login attempt
  const [loginState, setLoginState] = useState(loginResults.nosubmission);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const url = "http://localhost:3001/api/user/validate";

  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.get(url, { params: {
      username: username,
      password: password
    }}).then(response => {
      if (response.data.user.length > 0) {
        updateUser(response.data.user);
        navigate("/dashboard");
      } else {
        setLoginState(loginResults.incorrect);
      }
    })
    .catch(error => {
      console.log(error);
      setLoginState(loginResults.noconnection);
    })
  };

  function updateUser(user) {
    props.onChange(user);
}

  return (
    <>
      <main className="bg-champange">
        <div className="flex items-center justify-between pt-4">
          <div className="flex ml-12 pt-4">
            <img className="w-16 h-auto mt-1" src={allyLogo} alt="Logo"/>
            <h1 className="ml-2 font-bold text-4xl">kudos</h1>
          </div>
          <div className="flex space-x-4 justify-end pr-4">
            <a href="https://www.ally.com/about/">
              <HolderButton/>
            </a>
          </div>
        </div>
        <h2 className="ml-12 font-medium text-plum font-poppins text-xl mt-1 mb-10">Log In</h2>
        <div className="border-blueberry border-4 bg-white m-5 p-5">
          <h2 className="text-plum font-poppins font-bold text-xl mb-10 flex justify-center">Good to see you again!</h2>
          <div className="flex justify-center mb-8">
            <form action="/users/add" method="POST">
              <div className="w-full flex justify-center space-x-1">
                <p className="mt-1">Username:</p>
                <TextField
                  size="small"
                  onChange={(e) => {
                    setUsername(e.target.value)}}
                />
              </div>
              <div className="w-full flex justify-center pt-4 space-x-2">
                <p className="mt-1">Password:</p>
                <TextField
                  size="small"
                  onChange={(e) => {
                    setPassword(e.target.value)}}
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center">
            <div className={loginState === loginResults.nosubmission ? "text-black" : "text-red-500"}>{loginState}</div>
          </div>
          <nav className="m-5 flex justify-center">
            <div>
              <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                <Button 
                  variant="contained"
                  color="plum" 
                  size="large"
                  type="submit"
                  onClick={(e) => {handleSubmit()}} 
                  >
                  Sign in
                </Button>
              </ThemeProvider>
            </div>
          </nav>
          <div className="flex justify-center">
            <CreateAccount/>
          </div>
        </div>
      </main>
    </>
  );
}