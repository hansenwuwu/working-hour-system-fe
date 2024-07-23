import React from "react";
import "./TimeCard.css";
import { Button } from "antd";
import { uploadWorkingHours } from "../lib/api";
import { ProjectData, MemberData, TaskData } from "../lib/models";
import { RecorderState } from "./utils";

export function RecorderConfirm(props: {
  startTime: Date;
  duration: number;
  setDuration: CallableFunction;
  setState: CallableFunction;
  id: string | null;
  user: string | null;
  task: TaskData;
  projectData: ProjectData;
  setHasError: CallableFunction;
  setIsLoading: CallableFunction;
  setSelectedItem: CallableFunction;
  checkIn: Date | null;
  setCheckIn: CallableFunction;
  checkOut: Date | null;
  setCheckOut: CallableFunction;
  member: MemberData;
}) {
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
            backgroundColor: "#1a4499",
            marginTop: "10px",
            height: "40px",
            borderRadius: "20px",
          }}
        >
          <h3 style={{ color: "#FFFFFF", margin: 0 }}>Work accumulation</h3>
        </div>
        <h3>Thanks for your effort!</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              marginRight: "10px",
              lineHeight: "100%",
              alignSelf: "flex-end",
              fontSize: "40px",
            }}
          >
            {props.duration}
          </h1>
          <h3 style={{ margin: 0, lineHeight: "100%", alignSelf: "flex-end" }}>
            Hours
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
            width: "100%",
          }}
        >
          <Button
            className="btn_normal"
            type="primary"
            onClick={() => {
              props.setState(RecorderState.Editor);
            }}
          >
            Edit hours
          </Button>
          <Button
            className="btn_normal"
            type="primary"
            onClick={() => {
              if (props.id === null || props.user === undefined) {
                props.setHasError(true);
                return;
              }
              props.setIsLoading(true);
              uploadWorkingHours(
                props.id,
                props.member.englishName,
                props.projectData.project,
                props.task.type,
                props.task.item,
                props.duration,
                props.task.task,
                props.checkIn,
                props.checkOut
              )
                .then(() => {
                  props.setState(RecorderState.Starter);
                  props.setSelectedItem(undefined);
                })
                .catch((error: any) => {
                  console.error("Failed to fetch data:", error);
                })
                .finally(() => {
                  props.setIsLoading(false);
                });
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}
