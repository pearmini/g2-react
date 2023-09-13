import React from "react";
import { Chart } from "../../src";
import { render } from "./render";

function Demo() {
  return (
    <Chart
      spec={{
        type: "interval",
        data: [
          { genre: "Sports", sold: 275 },
          { genre: "Strategy", sold: 115 },
          { genre: "Action", sold: 120 },
          { genre: "Shooter", sold: 350 },
          { genre: "Other", sold: 150 },
        ],
        encode: { x: "genre", y: "sold" },
      }}
    />
  );
}

export const chartSpec = render(Demo);
