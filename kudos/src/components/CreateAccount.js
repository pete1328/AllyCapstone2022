import { React, useState } from "react";
import { appTheme } from "./Palette";
import { Badge, ThemeProvider, CssBaseline, Popover, Button, MenuItem, Select } from "@mui/material";
import axios from "axios";

export function CreateAccount() {
    const [accountPopUp, setAccountPopUp] = useState(null);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [role, setRole] = useState("Employee");
    const url = "http://localhost:3001/api/user/create";

    const handleChange = (event) => {
      setRole(event.target.value);
    };

    const handleClick = (event) => {
      setAccountPopUp(event.currentTarget);
    };
  
    const handleClose = () => {
      setAccountPopUp(null);
    };

    const handleSubmit = () => {
      axios.post(url, {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        position: role,
        reports_to: 1,
        sent: 0,
        received: 0,
      }).then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
      setAccountPopUp(null);
    };

    const open = Boolean(accountPopUp);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
                <Badge 
                color="plum"
                onClick={handleClick}
                >
                    <p alt="create-account-link" className="underline hover:cursor-pointer text-grapefruit">Create New Account</p>
                </Badge>
            </ThemeProvider>
            <Popover
            id={id}
            open={open}
            anchorEl={accountPopUp}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            >
                {/* pop up box for create account */}
                <div className="fixed left p-5 text-plum font-bold hover:cursor-pointer" onClick={() => {setAccountPopUp(null)}}>
                  X
                </div>
                <div className="w-100 h-auto flex justify-center">
                  <div className="flex justify-center mb-8 pl-10 pr-20 pt-20 pb-20">
                    <form>
                    <div className="flex">
                        <p>Username:</p>
                        <input type="text" className="ml-6 bg-champange border-plum border-2" onChange={e => setUserName(e.target.value)}/>
                    </div>
                    <div className="flex mt-5">
                        <p>Password:</p>
                        <input type="text" className="ml-7 bg-champange border-plum border-2" onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="flex mt-5">
                        <p>First Name:</p>
                        <input type="text" className="ml-5 bg-champange border-plum border-2" onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="flex mt-5">
                        <p>Last Name:</p>
                        <input type="text" className="ml-5 bg-champange border-plum border-2" onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className="flex mt-5">
                        <p>Position:</p>
                        <div className="ml-10 w-full bg-champange border-plum border-2">
                          <Select
                            className="w-full"
                            label="Age"
                            value={role}
                            onChange={handleChange}
                          >
                            <MenuItem value={"Employee"}>Employee</MenuItem>
                            <MenuItem value={"Manager"}>Manager</MenuItem>
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                          </Select>
                        </div>
                    </div>
                    </form>
                  </div>
                    <ThemeProvider theme={appTheme}>
                    <CssBaseline enableColorScheme />
                    <Button 
                        variant="contained"
                        color="plum" 
                        size="medium"
                        type="submit"
                        onClick={() => {handleSubmit()}} //add account to DB(tbd), closes popup
                    >
                    Create Account
                    </Button>
                    </ThemeProvider>
                </div>
            </Popover>
        </div>
    )
  }