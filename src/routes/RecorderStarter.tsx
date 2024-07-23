import React, { useEffect } from "react";
import "./TimeCard.css";
import { Button } from "antd";
import { EditOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { RecorderState } from "./utils";

export function RecorderStarter(props: {
  setState: CallableFunction;
  setStartTime: CallableFunction;
  setDuration: CallableFunction;
  storageKey: string;
}) {
  useEffect(() => {
    props.setDuration(0);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flex: 0.5,
          }}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<PlayCircleOutlined style={{ fontSize: "30px" }} />}
            style={{ padding: "30px 30px", fontSize: "30px" }}
            onClick={() => {
              props.setState(RecorderState.Timer);
              const now = new Date();
              props.setStartTime(now);
              localStorage.setItem(props.storageKey, now.toISOString());
            }}
          />
          <h2>Check In</h2>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flex: 0.5,
          }}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined style={{ fontSize: "30px" }} />}
            style={{
              padding: "30px 30px",
              fontSize: "30px",
              color: "#FFFFFF",
              backgroundColor: "#DC3545",
            }}
            onClick={() => {
              props.setState(RecorderState.Editor);
            }}
          />
          <h2>Key In</h2>
        </div>
      </div>
    </>
  );
}
