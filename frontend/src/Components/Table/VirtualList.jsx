import React, { useState, useEffect, useRef } from "react";

export default function VirtualList({
  total,
  rowHeight,
  onRangeLoad,
  rows,
  RowComponent,
  resetKey,
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);

  const startIndex = Math.floor(scrollTop / rowHeight);

  // Load rows when scrolling
  useEffect(() => {
    onRangeLoad(startIndex);
  }, [startIndex]);

  // Reset scroll on sort or search
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [resetKey]);

  return (
    <div
      ref={scrollRef}
      style={{ height: "720px", overflowY: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: total * rowHeight, position: "relative" }}>
        <div style={{ position: "absolute", top: startIndex * rowHeight }}>
          {rows.map((row) => (
            row ? <RowComponent key={row.id} row={row} /> : null
          ))}
        </div>
      </div>
    </div>
  );
}


