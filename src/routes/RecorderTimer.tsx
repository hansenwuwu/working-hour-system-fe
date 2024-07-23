import React, { useEffect } from "react";
import "./TimeCard.css";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { formatTime, RecorderState } from "./utils";

export function RecorderTimer(props: {
  setState: CallableFunction;
  startTime: Date;
  setDuration: CallableFunction;
  checkIn: Date | null;
  setCheckIn: CallableFunction;
  checkOut: Date | null;
  setCheckOut: CallableFunction;
  secondsElapsed: number;
  setSecondsElapsed: CallableFunction;
  storageKey: string;
}) {
  useEffect(() => {
    doOneSecond();
    const interval = setInterval(() => {
      doOneSecond();
    }, 1000);
    return () => clearInterval(interval);
  }, [props.startTime]);

  const doOneSecond = () => {
    if (props.startTime) {
      const currentTime = new Date();
      const elapsed = Math.floor(
        (currentTime.getTime() - props.startTime.getTime()) / 1000
      );
      props.setSecondsElapsed(elapsed);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#DC3545",
            marginTop: "10px",
            height: "40px",
            borderRadius: "20px",
          }}
        >
          <h3 style={{ color: "#FFFFFF", margin: 0 }}>
            In Progress - {formatTime(props.secondsElapsed)}
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "20px",
          }}
        >
          <Button
            type="primary"
            shape="circle"
            icon={
              <LogoutOutlined
                style={{
                  fontSize: "30px",
                }}
              />
            }
            style={{
              padding: "30px 30px",
              fontSize: "30px",
              backgroundColor: "#28A745",
              color: "#FFFFFF",
            }}
            onClick={() => {
              localStorage.removeItem(props.storageKey);
              const now = new Date();
              let seconds = now.getTime() - props.startTime.getTime();
              seconds = seconds / 1000;
              console.log("Actual seconds = ", seconds);
              const hours = Math.ceil((seconds / 3600) * 10) / 10;
              props.setDuration(hours);
              props.setState(RecorderState.Confirm);
              props.setCheckIn(props.startTime);
              props.setCheckOut(now);
            }}
          />
          <h2>Check Out</h2>
        </div>
      </div>
    </>
  );
}
