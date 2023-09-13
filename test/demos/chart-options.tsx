import React from "react";
import { Renderer } from "@antv/g-svg";
import { Chart } from "../../src";
import { render } from "./render";

function Demo() {
  return (
    <Chart
      options={{ renderer: new Renderer() }}
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

export const chartOptions = render(Demo);
