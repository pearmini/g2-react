# @berryv/g2-react

The lightweight [React](https://react.dev/) component for [@antv/g2 5.0](https://github.com/antvis/G2), which is based on the [Spec API](https://g2.antv.antgroup.com/manual/core/api).

## Installing

```bash
$ npm install @berryv/g2-react
```

```jsx
import React from "react";
import { Chart } from "@berryv/g2-react";

export function Demo() {
  return (
    <Chart
      options={{
        type: "interval",
        width: 640,
        height: 480,
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

| Property | Description                                                                                                     | Type                  | Default |
| -------- | --------------------------------------------------------------------------------------------------------------- | --------------------- | ------- |
| options  | the [options](https://g2.antv.antgroup.com/manual/core/api) for the visualization, say `chart.options(options)` | `G2options` \| `null` | -       |
| renderer | the [renderer](https://g.antv.antgroup.com/api/renderer/intro) of @antv/g canvas                                | `ChartOptions`        | -       |
| style    | the style of the container                                                                                      | `CSSProperties`       | -       |
| onInit   | the callback called after the chart instantiating                                                               | `Function`            | -       |
| ref      | the ref for the [chart instance](https://g2.antv.antgroup.com/manual/core/chart)                                | `ChartRef`            | -       |

## Examples

- [Creating Chart](#creating-chart)
- [Fetching Data](#updating-data)
- [Handling Events](#handling-events)
- [Customizing Component](#customizing-component)
- [Styling Container](#styling-container)

## Creating Chart

For more examples for `props.options`, see each [G2 example](https://g2.antv.antgroup.com/examples) and click the "Spec Tab".

```js
import React from "react";
import { Chart } from "@berryv/g2-react";
import { Renderer } from "@antv/g-svg";

export function Demo() {
  const renderer = useMemo(() => new Renderer(), []);
  return (
    <Chart
      // Set renderer to SVG, optional.
      renderer={renderer}
      options={{
        type: "interval",
        autoFit: true, // Fit the container.
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

### Updating Data

Using `useMemo` to define a computed options with data as a decency, this allows rerendering chart after the data updating.

```js
import React, { useState, useMemo } from "react";
import { Chart } from "@berryv/g2-react";

export function Demo() {
  const [data, setData] = useState(null);

  // The options will update after data updating.
  const options = useMemo(
    () => ({
      type: "interval",
      data,
      encode: { x: "genre", y: "sold" },
    }),
    [data]
  );

  useEffect(() => {
    // Mock the fetch delay.
    setTimeout(() => {
      // Update the data.
      setData([
        { genre: "Sports", sold: 275 },
        { genre: "Strategy", sold: 115 },
        { genre: "Action", sold: 120 },
        { genre: "Shooter", sold: 350 },
        { genre: "Other", sold: 150 },
      ]);
    }, 1000);
  });

  return <>{data === null ? <p>Loading...</p> : <Chart options={options} />}</>;
}
```

### Handling Events

`<Chart/>` exposes the ref for the G2 [chart instance](https://g2.antv.antgroup.com/manual/core/chart), which can be used to handle events or get some instances, such as scale, coordinate, etc,.

```js
import React, { useRef, useEffect } from "react";
import { ChartEvent } from "@antv/g2";
import { Chart } from "@berryv/g2-react";

export function Demo() {
  const chartRef = useRef();

  function onInit() {
    const chart = chartRef.current;

    // Listen input events.
    chart.on("plot:mouseover", () => {});

    // Listen lifecycle events.
    chart.on(ChartEvent.AFTER_RENDER, () => {
      // Emit to init the state of highlight interaction.
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

With the `register` API of G2, you can customize visual component and using it in options, such as customizing a triangle shape for bar chart:

```js
import React, { useRef, useEffect } from "react";
import { register } from "@antv/g2";

// Register a triangle shape for interval globally.
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
      options={{
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
          shape: "triangle", // Use the custom shape.
        },
      }}
    />
  );
}
```

### Styling Container

Define the css styles of the container:

```js
import React from "react";
import { Chart } from "@berryv/g2-react";

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
