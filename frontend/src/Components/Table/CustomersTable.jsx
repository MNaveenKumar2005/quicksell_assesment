import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import VirtualList from "./VirtualList";
import "./table.css";

const ROW_HEIGHT = 72;

export default function CustomersTable({
  indices,
  sort,
  setSort,
  workerRef,
  visibleRows,
  setVisibleRows,
  resetKey,
}) {
  const handleRangeLoad = (from) => {
    if (!workerRef.current) return;
    if (indices.length === 0) return;

    workerRef.current.postMessage({
      type: "getRows",
      payload: {
        from,
        indices,
      },
    });
  };

  return (
    <div className="table-container">
      <TableHeader sort={sort} setSort={setSort} />

      <VirtualList
        total={indices.length}
        rowHeight={ROW_HEIGHT}
        onRangeLoad={handleRangeLoad}
        rows={visibleRows}
        RowComponent={TableRow}
        resetKey={resetKey}
      />
    </div>
  );
}



