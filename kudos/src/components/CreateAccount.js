import { React, useState } from "react";
import { appTheme } from "./Palette";
import { Badge, ThemeProvider, CssBaseline, Popover, Button, MenuItem, Select, Autocomplete, TextField } from "@mui/material";
import { Hash } from "./User";
import axios from "axios";
import { database_prefix } from "..";

export function CreateAccount() {
    const [accountPopUp, setAccountPopUp] = useState(null);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [first_name, setFirstName] = useState();
    const [last_name, setLastName] = useState();
    const [email, setEmail] = useState();
    const [role, setRole] = useState("Employee");
    const [managers, setManagers] = useState([]);
    const [manager, setManager] = useState("");
    
    const create_url =  database_prefix + "/api/user/create";
    const managers_url = database_prefix + "/api/allManagers"

    const handleChange = (event) => {
      setRole(event.target.value);
    };

    const handleClick = (event) => {
      setAccountPopUp(event.currentTarget);
      axios.get(managers_url)
      .then(response => {
        let temp = []
        response.data.managers.forEach(element => {
          let pair = {
            name : element["first_name"] + " " + element["last_name"],
            id : element["user_id"]
          }
          temp.push(pair);
        });
        setManagers(temp);
      })
      .catch(error => {
        console.log(error);
      })
    };
  
    const handleClose = () => {
      setAccountPopUp(null);
    };

    const handleSubmit = () => {
      axios.post(create_url, {
        username: username,
        password: Hash(password),
        first_name: first_name,
        last_name: last_name,
        email: email,
        position: role,
        reports_to: (role !== "Employee" ? 0 : manager),
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
                <div className="bg-champagne">
                  <div className="border-4 border-dashed border-seafoam">
                    <div className="py-8 text-right pr-8 text-3xl text-plum font-bold hover:cursor-pointer" onClick={() => {setAccountPopUp(null)}}>
                      X
                    </div>
                    <div className="w-full h-auto flex justify-center">
                      <div className="flex justify-center pb-12 px-24">
                        <form>
                        <div className="flex">
                            <p className="font-serif font-bold text-plum">Username:</p>
                            <input type="text" className="ml-11 bg-champange border-plum rounded-md border-2" onChange={e => setUserName(e.target.value)}/>
                        </div>
                        <div className="flex mt-5">
                            <p className="font-serif font-bold text-plum">Password:</p>
                            <input type="text" className="ml-12 bg-champange border-plum rounded-md border-2" onChange={e => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex mt-5">
                            <p className="font-serif font-bold text-plum">First Name:</p>
                            <input type="text" className="ml-9 bg-champange border-plum rounded-md border-2" onChange={e => setFirstName(e.target.value)}/>
                        </div>
                        <div className="flex mt-5">
                            <p className="font-serif font-bold text-plum">Last Name:</p>
                            <input type="text" className="ml-10 bg-champange border-plum rounded-md border-2" onChange={e => setLastName(e.target.value)}/>
                        </div>
                        <div className="flex mt-5">
                            <p className="font-serif font-bold text-plum">Email Address:</p>
                            <input type="text" className="ml-2 bg-champange border-plum rounded-md border-2" onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div className="mt-5">
                            <p className="font-serif font-bold text-plum">Position:</p>
                            <div className="w-full bg-white border-plum rounded-lg border-2">
                              <Select
                                className="w-full"
                                label="Position"
                                value={role}
                                onChange={handleChange}
                              >
                                <MenuItem value={"Employee"}>Employee</MenuItem>
                                <MenuItem value={"Manager"}>Manager</MenuItem>
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                              </Select>
                            </div>
                        </div>
                        { role === "Employee" &&
                          <div className=" mt-5">
                            <p className="font-serif font-bold text-plum">Reports to:</p>
                            <div className="w-fit bg-white border-plum rounded-lg border-2">
                              <Autocomplete
                                disablePortal
                                options={managers}
                                getOptionLabel={(option) => option.name || ""}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params}/>}
                                onChange={(event, value) => setManager(value["id"])}
                              />
                            </div>
                          </div>
                        }
                        <div className="pt-8">
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
            </Popover>
        </div>
    )
  }