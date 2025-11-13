import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar";
import FiltersDropdown from "./components/FiltersDropdown";
import CustomersTable from "./components/Table/CustomersTable";
import logo from "./assets/logo.png";

export default function App() {
  const workerRef = useRef(null);

  const [indices, setIndices] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "id", dir: "asc" });
  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./workers/dataWorker.js", import.meta.url),
      { type: "module" }
    );

    const worker = workerRef.current;

    worker.onmessage = (e) => {
      const { type, payload } = e.data;

      if (type === "ready") {
        setIndices(payload.indices);
      }

      if (type === "result") {
        setIndices(payload.indices);
      }

      if (type === "rows") {
        setVisibleRows(payload.rows);
      }
    };

    worker.postMessage({ type: "generate", payload: { count: 1000000 } });
  }, []);

  useEffect(() => {
    if (!workerRef.current) return;

    const handler = setTimeout(() => {
      workerRef.current.postMessage({
        type: "query",
        payload: {
          query,
          sortKey: sort.key,
          sortDir: sort.dir,
        },
      });
    }, 250);

    return () => clearTimeout(handler);
  }, [query, sort]);

  return (
    <div className="page">
      <header className="top-header">
        <img src={logo} className="brand-logo" />
      </header>

      <hr className="divider" />

      <div className="section-title">
        <span className="title">All Customers</span>
        <span className="count-badge">{indices.length}</span>
      </div>

      <hr className="divider" />

      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <FiltersDropdown />
      </div>

      <CustomersTable
        indices={indices}
        sort={sort}
        setSort={setSort}
        visibleRows={visibleRows}
        setVisibleRows={setVisibleRows}
        workerRef={workerRef}
        resetKey={sort}
      />
    </div>
  );
}


