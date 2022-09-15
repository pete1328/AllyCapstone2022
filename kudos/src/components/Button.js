import React from "react";
import Button from '@mui/material/Button'

// Sanity check push

export function HomeButton() {
  return (
      <Button variant="contained">Home</Button>
  )
}

export function LoginButton() {
  return (
      <Button variant="contained">Log In</Button>
  );
}

export function LogoutButton() {
  return (
      <Button variant="contained">Log Out</Button>
  );
}

export function DashboardButton() {
  return (
      <Button variant="contained">I'm an employee, trust me</Button>
  );
}

export function KudosButton() {
  return (
      <Button variant="contained">Send Kudos!</Button>
  );
}

export function CreateMessageButton() {
  return (
      <Button variant="contained">Draft my message</Button>
  );
}