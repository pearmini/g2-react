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

| Property | Description                                                                                                                                        | Type               | Default |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| spec     | the [spec](https://g2.antv.antgroup.com/manual/core/api) for visualization , say `chart.options(spec)`                                             | `G2Spec` \| `null` | -       |
| options  | the [options](https://g2.antv.antgroup.com/manual/core/chart#%E5%85%A8%E5%B1%80%E9%80%89%E9%A1%B9) for instantiating char, say `G2.Chart(options)` | `ChartOptions`     | -       |
| style    | the style of the container                                                                                                                         | `CSSProperties`    | -       |
| onInit   | the callback called after the chart instantiating                                                                                                  | `Function`         | -       |
| ref      | the ref for the [chart instance](https://g2.antv.antgroup.com/manual/core/chart)                                                                   | `ChartRef`         | -       |

## Examples

- [Creating Chart](#creating-chart)
- [Fetching Data](#fetching-data)
- [Handling Events](#handling-events)
- [Customizing Component](#customizing-component)
- [Styling Container](#styling-container)

## Creating Chart

```js
import React from "react";
import { Chart } from "@strawberry-vis/g2-rect";
import { Renderer } from "@antv/g-svg";

export function Demo() {
  return (
    <Chart
      // Sets some global options for creating chart.
      options={{
        autoFit: true, // Fits the container.
        renderer: new Renderer(), // Renders chart into a SVG node.
      }}
      // Sets the options related to visualization.
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

### Fetching Data

```js
import React, { useState, useMemo } from "react";
import { Chart } from "@strawberry-vis/g2-rect";

export function Demo() {
  const [data, setData] = useState(null);

  // The spec will update after data updating.
  const spec = useMemo(
    () => ({
      type: "interval",
      data,
      encode: { x: "genre", y: "sold" },
    }),
    [data]
  );

  useEffect(() => {
    // Mocks fetch.
    setTimeout(() => {
      // Updates data.
      setData([
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ]);
    }, 1000);
  });

  return <>{data === null ? <p>Loading...</p> : <Chart spec={spec} />}</>;
}
```

### Handling Events

```js
import React, { useRef, useEffect } from "react";
import { ChartEvent } from "@antv/g2";
import { Chart } from "@strawberry-vis/g2-rect";

export function Demo() {
  const chartRef = useRef();

  function onInit() {
    const chart = chartRef.current;

    // Listens input events.
    chart.on("plot:mouseover", () => {});

    // Listens lifecycle events.
    chart.on(ChartEvent.AFTER_RENDER, () => {
      // Emits to init the state of highlight interaction.
      chart.emit("element:highlight", {
        data: {
          data: { genre: "Sports" },
        },
      });
    });
  }

  return <Chart ref={chartRef} onInit={onInit} />;
}
```

### Customizing Component

```js
import React, { useRef, useEffect } from "react";
import { register } from "@antv/g2";

// Registers a triangle shape for interval globally.
register("shape.interval.triangle", (style, context) => {
  const { document } = context;
  return (P, value, defaults) => {
    const { color: defaultColor } = defaults;
    const [p0, p1, p2, p3] = P;
    const pm = [(p0[0] + p1[0]) / 2, p0[1]];
    const { color = defaultColor } = value;
    const group = document.createElement("g");
    const polygon = document.createElement("polygon", {
      style: {
        ...style,
        fill: color,
        points: [pm, p2, p3],
      },
    });
    group.appendChild(polygon);
    return group;
  };
});

export function Demo() {
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
        encode: {
          x: "genre",
          y: "sold",
          shape: "triangle", // Uses the custom shape.
        },
      }}
    />
  );
}
```

### Styling Container

```js
import React from "react";
import { Chart } from "@strawberry-vis/g2-rect";

export function Demo() {
  // ...
  return (
    <Chart
      options={{ autoFit: true }}
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
```
