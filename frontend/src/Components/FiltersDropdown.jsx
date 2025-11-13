import React, { useState } from "react";
import filterIcon from "../assets/filter.svg";


export default function FiltersDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
  onClick={() => setOpen((v) => !v)}
  style={{
    padding: "10px 14px",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <img
    src={filterIcon}
    alt="filter"
    style={{ width: "18px", height: "18px", opacity: 0.6 }}
  />

  Add Filters
</button>



      {open && (
  <div
    style={{
      position: "absolute",
      top: "48px",
      left: 0,
      background: "white",
      borderRadius: "10px",
      width: "160px",
      padding: "6px 0",
      boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
      border: "1px solid #e5e7eb",
      zIndex: 9999,
    }}
  >
    {["Filter 1", "Filter 2", "Filter 3", "Filter 4"].map((item) => (
      <div
        key={item}
        style={{
          padding: "10px 14px",
          cursor: "pointer",
          fontSize: "14px",
          color: "#374151",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#f3f4f6")}
        onMouseLeave={(e) => (e.target.style.background = "white")}
      >
        {item}
      </div>
    ))}
  </div>
)}

    </div>
  );
}
