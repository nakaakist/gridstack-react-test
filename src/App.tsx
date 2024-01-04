import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import { useEffect } from "react";
import "./App.css";

export const App = () => {
  useEffect(() => {
    GridStack.init();
  }, []);

  return (
    <div>
      <div className="grid-stack">
        <div className="grid-stack-item" data-gs-width="4" data-gs-height="4">
          <div className="grid-stack-item-content">Item 1</div>
        </div>
        <div className="grid-stack-item" data-gs-width="4" data-gs-height="4">
          <div className="grid-stack-item-content">Item 2</div>
        </div>
        <div className="grid-stack-item" data-gs-width="4" data-gs-height="4">
          <div className="grid-stack-item-content">Item 3</div>
        </div>
      </div>
    </div>
  );
};
