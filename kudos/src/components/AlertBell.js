import { React, useState } from "react";
import { appTheme } from "./Palette";
import bell from "../assets/bell-regular.svg"
import { Badge, ThemeProvider, CssBaseline, Popover } from "@mui/material";
import { Message } from "./Message";
import { r_messages } from "./TestData";

export function AlertBell(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      updateAlerts(0);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    function updateAlerts(alerts) {
        props.onChange(alerts);
    }

    return (
        <div>
            <ThemeProvider theme={appTheme}>
            <CssBaseline enableColorScheme />
                <Badge
                badgeContent={props.alerts} 
                color="plum"
                onClick={handleClick}
                >
                    <img src={bell} alt="bell" className="w-6 hover:cursor-pointer"/>
                </Badge>
            </ThemeProvider>
            <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            >
                <div>
                    {r_messages.map((message, id) => {
                        
                        return(
                            <li key={id}>
                                <Message 
                                sender={message.sender} 
                                reciever={message.reciever} 
                                text={message.text} 
                                points={message.points} 
                                gif={message.gif} 
                                font={message.font}/>
                            </li>
                        )
                    })}
                </div>
            </Popover>
        </div>
    )
  }