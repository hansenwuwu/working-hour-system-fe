import React from "react";
import "./TimeCard.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export function Loading() {
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
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    </>
  );
}
