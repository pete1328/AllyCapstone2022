import { React, useState } from "react";
import { appTheme } from "./Palette";
import bell from "../assets/bell-regular.svg"
import cat from "../assets/cat.png"
import { Badge, ThemeProvider, CssBaseline, Popover } from "@mui/material";

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
                    <img src={bell} alt="bell" className="w-6"/>
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
                {/* content of notifications */}
                <div className="w-auto h-48 flex justify-center">
                    <img src={cat} alt="cat"/>
                </div>
            </Popover>
        </div>
    )
  }