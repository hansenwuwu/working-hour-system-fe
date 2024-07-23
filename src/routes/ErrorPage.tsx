import React from "react";
import "./TimeCard.css";
import { Result } from "antd";

export function ErrorPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 70px)",
        }}
      >
        <Result status="warning" title="Sorry, the page cannot be found." />
      </div>
    </>
  );
}
