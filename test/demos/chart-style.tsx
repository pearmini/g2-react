import React from "react";
import { Chart } from "../../src";
import { render } from "./render";

function Demo() {
  return (
    <Chart
      spec={{
        type: "interval",
        autoFit: true,
        data: [
          { genre: "Sports", sold: 275 },
          { genre: "Strategy", sold: 115 },
          { genre: "Action", sold: 120 },
          { genre: "Shooter", sold: 350 },
          { genre: "Other", sold: 150 },
        ],
        encode: { x: "genre", y: "sold" },
      }}
      style={{
        width: 800,
        height: 600,
        background: "#eee",
        padding: "1em",
        borderRadius: "0.5em",
      }}
    />
  );
}

export const chartStyle = render(Demo);
