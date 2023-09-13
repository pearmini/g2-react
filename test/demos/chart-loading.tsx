import React, { useEffect, useMemo, useState } from "react";
import { Chart } from "../../src";
import { render } from "./render";

function Demo() {
  const [data, setData] = useState<Record<string, any>[] | null>(null);
  const spec = useMemo(
    () => ({
      type: "interval",
      data,
      encode: { x: "genre", y: "sold" },
    }),
    [data]
  );

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

  return <>{data === null ? <p>loading...</p> : <Chart spec={spec} />}</>;
}

export const ChartLoading = render(Demo);
