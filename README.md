# @strawberry-vis/g2-rect

The lightweight React Component for [@antv/g2](https://github.com/antvis/G2).

## Installing

```bash
$ npm install @strawberry-vis/g2-rect
```

```jsx
import React from "react";
import { Chart } from "@strawberry-vis/g2-rect";

export function Card() {
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
```

## API Reference

| Property | Description                                             | Type               | Default |
| -------- | ------------------------------------------------------- | ------------------ | ------- |
| spec     | spec for visualization , say `chart.options(spec)`      | `G2Spec` \| `null` | -       |
| options  | options for instantiating char, say `G2.Chart(options)` | `ChartOptions`     | -       |
| style    | style of the container                                  | `CSSProperties`    | -       |
| onInit   | callback called after the chart instantiating           | `Function`         | -       |
| ref      | ref for chart instance                                  | `ChartRef`         | -       |

## Examples

There are some basic examples where you can get started.

### Create Chart

### Fetch Data

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
    setOptions({
      ...options,
      data: options.data.slice(0, 2),
    });
  }

  return (
    <div>
      <Chart options={options} />
      <button onClick={onClick}>Update Options</button>
    </div>
  );
}
```

### Listen Events

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

### Emit Events

### Style Container
