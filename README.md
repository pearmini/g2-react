# @strawberry-vis/g2-rect

A lightweight React Component for @antv/g2.

## Installing

```bash
npm install @strawberry-vis/g2-rect
```

```jsx
import React, { useState } from "react";
import { Chart } from "@strawberry-vis/g2-rect";

export function Card() {
  return (
    <Chart
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
```

## API Reference

<a name="props-options" href="#props-options">#</a> props.**options**

```js
import React, { useState } from "react";
import { Chart } from "@strawberry-vis/g2-rect";

export function Card() {
  const [options, setOptions] = useState({
    type: "interval",
    data: [
      { genre: "Sports", sold: 275 },
      { genre: "Strategy", sold: 115 },
      { genre: "Action", sold: 120 },
      { genre: "Shooter", sold: 350 },
      { genre: "Other", sold: 150 },
    ],
    encode: { x: "genre", y: "sold" },
  });

  function onClick() {
    setOptions({ ...options, data: options.data.slice(0, 2) });
  }

  return (
    <div>
      <Chart options={options} />
      <button onClick={onClick}>Update Options</button>
    </div>
  );
}
```

<a name="props-chartref" href="#props-chartref">#</a> props.**chartRef**

```js
import React, { useRef, useEffect } from "react";
import { Chart } from "@strawberry-vis/g2-rect";

export function Card() {
  const chartRef = useRef();

  useEffect(() => {
    const chart = chartRef.current;
    chart.on("afterrender", () => {});
  }, []);

  return <Chart options={options} chartRef={chartRef} />;
}
```
