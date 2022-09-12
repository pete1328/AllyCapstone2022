import React, { useState } from "react";

export function CountButton() {
  const [count, setCount] = useState(0);

  return (
      <button onClick={() => {setCount(count + 1)}}>Hello World! {count}</button>
  )
}