import React from "react";
import stringToColor from "../../utils/colors";

export default function TableRow({ row }) {
  if (!row) return null;

  return (
    <div className="table-row">
      <div>
        <input type="checkbox" />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          className="avatar"
          style={{ background: stringToColor(row.name) }}
        >
          {row.avatar}
        </div>

        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
          <span className="name">{row.name}</span>
          <span className="small-muted">{row.phone}</span>
        </div>
      </div>

      <div>
        <div className="badge">{row.score}</div>
      </div>

      <div>{row.email}</div>

      <div className="small-muted">
        {new Date(row.lastMessageAt).toLocaleString()}
      </div>

      <div>{row.addedBy}</div>
    </div>
  );
}


