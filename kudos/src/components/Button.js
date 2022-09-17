import React from "react";
import Button from '@mui/material/Button'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { appTheme } from "../assets/Palette";

export function HomeButton() {
  return (
      <Button variant="contained">Home</Button>
  )
}

export function HolderButton() {
  return (
      <Button variant="contained">Place Hold</Button>
  )
}

export function LogoutButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="contained"
      color="primary" 
      size="large">
        Log out
      </Button>
    </ThemeProvider>
  );
}

export function DashboardButton() {
  return (
      <Button variant="contained">Sign Me In</Button>
  );
}

export function KudosButton() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
        <Button 
        variant="contained"
        color="primary" 
        size="large">
          Send Kudos
        </Button>
    </ThemeProvider>
  );
}

export function CreateMessageButton() {
  return (
      <Button variant="contained">Draft my message</Button>
  );
}

export function WordWizardHelpButton() {
  return (
      <Button variant="contained">Summon Word Wizard</Button>
  );
}

export function SendKudosButton() {
  return (
      <Button variant="contained">Send my message</Button>
  );
}

export function ManagePointsButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="outlined"
      color="primary" 
      size="large">
        Manage Points
      </Button>
    </ThemeProvider>
  );
}

export function RedeemButton() {
  return (
    <ThemeProvider theme={appTheme}>
    <CssBaseline enableColorScheme />
      <Button 
      variant="outlined"
      color="primary" 
      size="large">
        Redeem
      </Button>
    </ThemeProvider>
  );
}