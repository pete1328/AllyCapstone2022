import React from "react";
import Button from '@mui/material/Button'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "./Palette";

export function HomeButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button
      variant="contained"
      color="secondary" 
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
      color="seafoam" 
      size="large">
        About Us
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
      color="seafoam" 
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
      color="seafoam" 
      size="large">
        See Main Dashboard
      </Button>
    </ThemeProvider>
  );
}

export function MoreStatsButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
        variant="contained"
        color="seafoam" 
        size="large">
          Admin Statistics
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
        color="seafoam" 
        size="large">
          Start
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
      color="secondary" 
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
      color="secondary" 
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
      color="secondary" 
      size="large">
        Send message
      </Button>
    </ThemeProvider>
  );
}

export function TryNowButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="seafoam" 
      size="large">
        Try now
      </Button>
    </ThemeProvider>
  );
}

export function BackButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="seafoam" 
      size="large">
        Back
      </Button>
    </ThemeProvider>
  );
}

export function NextButton(props) {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      disabled={props.disabled}
      variant="contained"
      color="seafoam" 
      size="large">
        Next
      </Button>
    </ThemeProvider>
  );
}