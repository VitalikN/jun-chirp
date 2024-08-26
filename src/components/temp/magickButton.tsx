"use client";

import React, { useEffect, useState } from "react";

export default function MagicButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 2) {
      throw new Error("Unexpected error");
    }
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>Magic button</button>;
}
