import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

export function render(Demo) {
  return () => {
    const container = document.createElement("div");
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Demo />
      </StrictMode>
    );
    return container;
  };
}
