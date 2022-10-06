import { React, useState } from "react";
import { Button } from "@mui/material";
import { HolderButton } from "../components/Button";
import { appTheme } from "../components/Palette";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import allyLogo from '../assets/allyLogoBlack.png';
import PropTypes from 'prop-types'; // 9/28
//ERROR - import loginUser from '../../../kudos-services/main.js'; // 9/28
//  won't work bc main.js with calls are out of scope ??
import { CreateAccount } from "../components/CreateAccount";

const loginResults = {
  nosubmission: 'Please input your information above',
  nonexistant: 'Be sure to create an account first',
  incorrect: 'Your username or password is incorrect'
}

/* Make a POST request to the server  <--- TBD: put in main.js NOT here
*  sending the credentials as a parameter */
async function loginUser(username, password) {
  return fetch('https://localhost:3000/login',
    {
      method: 'POST',
      body: JSON.stringify(username, password)
    })
    .then(data => data.json())
};

export function LoginPage({setValidation}) {

  // const [attemptsTotal] = useState(0); update every login attempt
  const [loginState, setLoginState] = useState(loginResults.nosubmission);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const processSubmit = async e => {
    e.preventDefault();
    
    const validation = await loginUser(
      {username, password});
    setValidation(validation);
    //OR... setLoginState(loginResults.incorrect)
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
            <form>
              <div className="flex">
                <p>Username:</p>
                <input type="text" className="ml-2 bg-champange border-plum border-2" onChange={e => setUserName(e.target.value)}/>
              </div>
              <div className="flex mt-5">
                <p>Password:</p>
                <input type="text" className="ml-3 bg-champange border-plum border-2" onChange={e => setPassword(e.target.value)}/>
              </div>
            </form>
          </div>
          <nav className="m-5 flex justify-center">
            <Link to="/dashboard">
              <ThemeProvider theme={appTheme}>
                <CssBaseline enableColorScheme />
                <Button 
                  variant="contained"
                  color="plum" 
                  size="large"
                  onClick={() => {processSubmit(username,password)}} //depends on inputs!
                  >
                  Sign in
                </Button>
              </ThemeProvider>
            </Link>
          </nav>
          <div className="flex justify-center">
            {loginState === loginResults.nosubmission && 
                <div>Please insert your information above</div>
            }
            {loginState === loginResults.incorrect && 
              <div>Your username or password is incorrect</div>
            }
          </div>
          <div className="flex justify-center">
            <CreateAccount/>
          </div>
        </div>
      </main>
    </>
  );
}

LoginPage.propTypes = { //destructure the props object
  setValidation: PropTypes.func.isRequired
}