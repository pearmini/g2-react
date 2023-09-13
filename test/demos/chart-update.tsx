import React, { useState } from "react";
import { Chart } from "../../src";
import { render } from "./render";

function Demo() {
  const data = [
    { genre: "Sports", sold: 275 },
    { genre: "Strategy", sold: 115 },
    { genre: "Action", sold: 120 },
    { genre: "Shooter", sold: 350 },
    { genre: "Other", sold: 150 },
  ];

  const [options, setOptions] = useState({
    type: "interval",
    data,
    encode: { x: "genre", y: "sold", color: "genre" },
  });

  function onClick() {
    setOptions({
      ...options,
      data: data.sort(() => Math.random() - 0.5),
    });
  }

  return (
    <>
      <Chart spec={options} />
      <button onClick={onClick}>Update</button>
    </>
  );
}

export const chartUpdate = render(Demo);
