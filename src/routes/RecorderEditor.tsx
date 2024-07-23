import React from "react";
import "./TimeCard.css";
import { Button, Input } from "antd";
import { RecorderState } from "./utils";

export function RecorderEditor(props: {
  setState: CallableFunction;
  duration: number;
  setDuration: CallableFunction;
  checkIn: Date | null;
  setCheckIn: CallableFunction;
  checkOut: Date | null;
  setCheckOut: CallableFunction;
}) {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>Key In</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Input
            value={props.duration}
            onChange={(e: any) => {
              props.setDuration(e.target.value);
            }}
            variant="borderless"
            style={{
              borderBottom: "1px solid",
              borderRadius: 0,
              flexGrow: 1,
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: "30px",
              fontWeight: "600",
            }}
          />
          <h2>Hours</h2>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            className="btn_normal"
            type="primary"
            onClick={() => {
              props.setState(RecorderState.Confirm);
              props.setCheckIn(null);
              props.setCheckOut(null);
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
