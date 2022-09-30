import { React, useState } from "react";
import { appTheme } from "./Palette";
import { Badge, ThemeProvider, CssBaseline, Popover, Button } from "@mui/material";

export function CreateAccount() {
    const [accountPopUp, setAccountPopUp] = useState(null);

    const handleClick = (event) => {
      setAccountPopUp(event.currentTarget);
    };
  
    const handleClose = () => {
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
                    <div className="flex ml-20">
                        <p>Username:</p>
                        <input type="text" className="ml-2 bg-champange border-plum border-2"/>
                    </div>
                    <div className="flex mt-5 ml-20">
                        <p>Password:</p>
                        <input type="text" className="ml-3 bg-champange border-plum border-2"/>
                    </div>
                    <div className="flex mt-5 ml-5">
                        <p>Confirm Password:</p>
                        <input type="text" className="ml-3 bg-champange border-plum border-2"/>
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
                        onClick={() => {setAccountPopUp(null)}} //add account to DB(tbd), closes popup
                    >
                    Create Account
                    </Button>
                    </ThemeProvider>
                </div>
            </Popover>
        </div>
    )
  }