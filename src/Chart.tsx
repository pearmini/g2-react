import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
} from "react";
import {
  Chart as G2Chart,
  G2Spec,
  ChartOptions as G2ChartOptions,
} from "@antv/g2";

export type ChartRef = G2Chart | undefined;

export type ChartOptions = Omit<G2ChartOptions, "container">;

export type ChartProps = {
  options: G2Spec | null;
  renderer?: G2ChartOptions["renderer"];
  style?: CSSProperties;
  onInit?: () => void;
};

export const Chart = forwardRef<ChartRef, ChartProps>((props, ref) => {
  const { options, style, onInit, renderer } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<G2Chart>();
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      chartRef.current = new G2Chart({
        container: containerRef.current,
        renderer,
      });
      setInit(true);
    }
    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, []);

  useEffect(() => {
    if (init) onInit?.();
  }, [init]);

  useEffect(() => {
    if (chartRef.current && options) {
      chartRef.current.options(options);
      chartRef.current.render();
    }
  }, [options]);

  useImperativeHandle(ref, () => chartRef.current, [init]);

  return <div ref={containerRef} style={style}></div>;
});
