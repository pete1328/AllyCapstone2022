import { React, useState } from "react";
import { Button, TextField } from "@mui/material";
import { HolderButton } from "../components/Button";
import { appTheme } from "../components/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CreateAccount } from "../components/CreateAccount";
import { Hash } from "../components/User";
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

  function updateUser(user) {
    props.onChange(user);
  }

  const handleSubmit = () => {
    axios.get(url, { params: {
      username: username,
      password: Hash(password)
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

  return (
    <>
      <main className="bg-champane p-4">
        <div className="flex items-center justify-between pt-2">
          <div className="flex ml-5 pt-4">
            <h1 className="font-thin text-white font-serif text-4xl">₭udos</h1>
          </div>
          <div className="flex space-x-4 justify-end pr-5">
            <a href="https://www.ally.com/about/">
              <HolderButton/>
            </a>
          </div>
        </div>
        <div>
          <h2 className="ml-5 font-medium text-seafoam font-serif text-xl mt-1 mb-10">Log In</h2>
          <div className="bg-champagne p-2">
            <div className="border-2 border-blueberry border-dashed">
              <div>
                <h2 className="text-grape font-serif font-bold text-xl flex justify-center py-8">Good to see you again!</h2>
                <div className="flex justify-center">
                  <form action="/users/add" method="POST">
                    <div className="w-full flex justify-center space-x-1">
                      <p className="mt-1 font-serif">Username:</p>
                      <TextField
                        size="small"
                        onChange={(e) => {
                          setUsername(e.target.value)}}
                      />
                    </div>
                    <div className="w-full flex justify-center pt-4 space-x-2">
                      <p className="mt-1 font-serif">Password:</p>
                      <TextField
                        size="small"
                        type={"password"}
                        onChange={(e) => {
                          setPassword(e.target.value)}}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex justify-center">
                <div className={loginState === loginResults.nosubmission ? "text-black" : "text-red-500 pt-4"}>{loginState}</div>
              </div>
              <nav className="flex justify-center py-6">
                <div>
                  <ThemeProvider theme={appTheme}>
                    <CssBaseline enableColorScheme />
                    <Button 
                      variant="contained"
                      color="seafoam" 
                      size="large"
                      type="submit"
                      onClick={handleSubmit} 
                      >
                      Sign in
                    </Button>
                  </ThemeProvider>
                </div>
              </nav>
              <div className="pb-8 flex justify-center">
                <CreateAccount/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}