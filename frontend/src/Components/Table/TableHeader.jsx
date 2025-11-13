import React from "react";

export default function TableHeader({ sort, setSort }) {
  const toggle = (key) => {
    setSort((prev) =>
      prev.key === key
        ? { key, dir: prev.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );
  };

  return (
    <div className="table-header">
      <div></div>
      <div onClick={() => toggle("name")}>Customer</div>
      <div onClick={() => toggle("score")}>Score</div>
      <div onClick={() => toggle("email")}>Email</div>
      <div onClick={() => toggle("lastMessageAt")}>Last Message</div>
      <div>Added By</div>
    </div>
  );
}
