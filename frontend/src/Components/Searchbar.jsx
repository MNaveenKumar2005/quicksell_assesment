import React from "react";
import searchIcon from "../assets/search.svg";


export default function SearchBar({ value, onChange }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e5e7eb",
        padding: "10px 14px",
        borderRadius: "8px",
        width: "280px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >

      <img
  src={searchIcon}
  alt="search"
  style={{ width: "18px", height: "18px", opacity: 0.6 }}
/>


      <input
        placeholder="Search Customers"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          outline: "none",
          border: "none",
          width: "100%",
          fontSize: "14px",
        }}
      />
    </div>
  );
}

