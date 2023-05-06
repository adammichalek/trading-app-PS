import React from "react";

const Feed = (props) => {
  const { title, description, link, pubDate } = props;

  return (
    <div
      className="card rounded bg-white"
      style={{ maxHeight: "200px", background: "#f8f9fa", color: "#5f6368" }}
    >
      <div className="card-body">
        <a href={link} style={{textDecoration:"none"}}><p className="card-title text-primary font-weight-bold" style={{ color: "#5f6368", fontSize:"16px"}}>{title.replaceAll("&apos;","AT&amp","'")}</p></a>
        <p className="card-subtitle mb-2 text-muted" style={{fontSize:"12px"}}>{pubDate}</p>
        <p className="card-text" style={{ color: "#5f6368", fontSize:"12px"}}>{description.replaceAll("&apos;","'")}</p>
      </div>
    </div>
  );
};

export default Feed;
