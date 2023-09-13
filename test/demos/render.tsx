import React from "react";
import { createRoot } from "react-dom/client";

export function render(Demo) {
  return () => {
    const container = document.createElement("div");
    const root = createRoot(container);
    root.render(<Demo />);
    return container;
  };
}
