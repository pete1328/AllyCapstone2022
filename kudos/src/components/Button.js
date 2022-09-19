import React from "react";
import Button from '@mui/material/Button'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "../assets/Palette";

export function HomeButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="primary" 
      size="large">
        Home
      </Button>
    </ThemeProvider>
  )
}

export function HolderButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="primary" 
      size="large">
        Placeholder
      </Button>
    </ThemeProvider>
  )
}

export function LogoutButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="plum" 
      size="large">
        Log out
      </Button>
    </ThemeProvider>
  );
}

export function DashboardButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="primary" 
      size="large">
        Sign in
      </Button>
    </ThemeProvider>
  );
}

export function KudosButton() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
        <Button 
        variant="contained"
        color="plum" 
        size="large">
          Send Kudos
        </Button>
    </ThemeProvider>
  );
}

export function CreateMessageButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="primary" 
      size="large">
        Draft my message
      </Button>
    </ThemeProvider>
  );
}

export function WordWizardHelpButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="primary" 
      size="large">
        Summon word wizard
      </Button>
    </ThemeProvider>
  );
}

export function SendMessageButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="primary" 
      size="large">
        Send message
      </Button>
    </ThemeProvider>
  );
}