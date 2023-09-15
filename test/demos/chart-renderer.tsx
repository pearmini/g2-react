import React, { useMemo } from "react";
import { Renderer } from "@antv/g-svg";
import { Chart } from "../../src";
import { render } from "./render";

function Demo() {
  const renderer = useMemo(() => new Renderer(), []);
  return (
    <Chart
      renderer={renderer}
      options={{
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

export const chartRenderer = render(Demo);
