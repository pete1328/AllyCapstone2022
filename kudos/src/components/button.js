import React, { useState } from "react";
import Button from '@mui/material/Button'

export function CountButton() {
  const [count, setCount] = useState(0);

  return (
      <Button variant="contained" onClick={() => {setCount(count + 1)}}>Hello World! {count}</Button>
  )
}

export function LoginButton() {
  return (
      <Button variant="contained">Log In!</Button>
  );
}