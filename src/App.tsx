import { GridStack } from "gridstack";
import "gridstack/dist/gridstack.css";
import { RefObject, createRef, useEffect, useRef, useState } from "react";
import "./App.css";

type ItemProps = { id: string };

const Item = ({ id }: ItemProps) => <div>{id}</div>;

const ControlledStack = ({
  items,
  addItem,
}: {
  items: ItemProps[];
  addItem: () => void;
}) => {
  const refs = useRef<Record<string, RefObject<HTMLDivElement>>>({});
  const gridRef = useRef<GridStack>();

  if (Object.keys(refs.current).length !== items.length) {
    items.forEach(({ id }) => {
      refs.current[id] = refs.current[id] || createRef();
    });
  }

  useEffect(() => {
    gridRef.current =
      gridRef.current || GridStack.init({ float: true }, ".controlled");
    const grid = gridRef.current;
    grid.batchUpdate();
    grid.removeAll(false);
    items.forEach(({ id }) => {
      const ref = refs.current[id].current;
      if (ref) grid.makeWidget(ref);
    });
    grid.batchUpdate(false);
  }, [items]);

  return (
    <div>
      <button onClick={addItem}>Add new widget</button>
      <div className={`grid-stack controlled`}>
        {items.map((item) => {
          return (
            <div
              ref={refs.current[item.id]}
              key={item.id}
              //              className={"grid-stack-item"}
            >
              <div>
                <Item {...item} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const App = () => {
  const [items, setItems] = useState([{ id: "item-1" }, { id: "item-2" }]);
  return (
    <ControlledStack
      items={items}
      addItem={() => setItems([...items, { id: `item-${items.length + 1}` }])}
    />
  );
};
