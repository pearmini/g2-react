import React, { useRef } from "react";
import { Chart, ChartRef } from "../../src";
import { render } from "./render";

function Demo() {
  const chartRef = useRef<ChartRef>(null);

  function onInit() {
    const chart = chartRef.current;
    if (chart) {
      chart.on("afterrender", () => {
        chart.emit("element:highlight", {
          data: {
            data: { genre: "Sports" },
          },
        });
      });
    }
  }

  return (
    <Chart
      ref={chartRef}
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
        state: { active: { fill: "red" } },
        interaction: { elementHighlight: true },
      }}
      onInit={onInit}
    />
  );
}

export const chartRef = render(Demo);
