import { Key, ReactNode, useLayoutEffect, useRef, useState } from "react";

type OverflowContainerProps<T> = {
  items: T[];
  getKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
  renderOverflow: (overflowAmount: number) => ReactNode;
  className: string;
};

const OverflowContainer = <T,>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverflowContainerProps<T>) => {
  const [overflowAmount, setOverflowAmount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current == null) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const containerElement = entries[0].target;
      const children =
        containerElement.querySelectorAll<HTMLElement>("[data-item]");
      const overflowElement =
        containerElement.parentElement?.querySelector<HTMLElement>(
          "[data-overflow]"
        );

      if (overflowElement != null) overflowElement.style.display = "none";
      children.forEach((child) => child.style.removeProperty("display"));

      let amount = 0;
      for (let i = children.length - 1; i > -1; i--) {
        const child = children[i];
        child.style.setProperty("display", "block");

        if (containerElement.scrollHeight <= containerElement.clientHeight) {
          break;
        }
        amount = children.length - i;
        child.style.display = "none";
        overflowElement?.style.removeProperty("display");
      }
      setOverflowAmount(amount);
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [items]);

  return (
    <>
      <div className={className} ref={containerRef}>
        {items.map((item) => (
          <div data-item key={getKey(item)}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div data-overflow>{renderOverflow(overflowAmount)}</div>
    </>
  );
};
export default OverflowContainer;
