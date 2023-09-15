import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "../../src";
import { render } from "./render";

function Demo() {
  const [data, setData] = useState<Record<string, any>[] | null>(null);
  const options = useMemo(() => {
    if (data === null) return null;
    return {
      type: "interval",
      data,
      encode: { x: "genre", y: "sold" },
    };
  }, [data]);

  useEffect(() => {
    // Mock fetch.
    setTimeout(() => {
      setData([
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ]);
    }, 1000);
  });

  return <Chart options={options} />;
}

export const ChartFetch = render(Demo);
