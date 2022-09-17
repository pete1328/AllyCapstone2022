import React from "react";
import Button from '@mui/material/Button'

// Sanity check push

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

export function LoginButton() {
  return (
      <Button variant="contained">Log In</Button>
  );
}

export function LogoutButton() {
  return (
    <div>
      <Button
      variant="contained"
      color="primary"
      size="large">
        Log out
      </Button>
    </div>
  );
}

export function DashboardButton() {
  return (
      <Button variant="contained">Sign Me In</Button>
  );
}

export function KudosButton() {
  return (
      <Button variant="contained">Send Kudos</Button>
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
      <Button
      variant="outlined"
      color="primary"
      size="large">
        Manage Points
      </Button>
  );
}

export function RedeemButton() {
  return (
      <Button
      variant="outlined"
      color="primary"
      size="large">
        Redeem
      </Button>
  );
}