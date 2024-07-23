import React, { useState } from "react";
import "./TimeCard.css";
import { ProjectData, MemberData, TaskData } from "../lib/models";
import moment from "moment";
import { RecorderState } from "./utils";
import { RecorderStarter } from "./RecorderStarter";
import { RecorderTimer } from "./RecorderTimer";
import { RecorderConfirm } from "./RecorderConfirm";
import { RecorderEditor } from "./RecorderEditor";

export function Recorder(props: {
  projectData: ProjectData;
  selectedItem: TaskData;
  setSelectedItem: CallableFunction;
  id: string | null;
  user: string | null;
  setHasError: CallableFunction;
  setIsLoading: CallableFunction;
  cardType: string | undefined;
  checkIn: Date | null;
  setCheckIn: CallableFunction;
  checkOut: Date | null;
  setCheckOut: CallableFunction;
  member: MemberData;
  storageKey: string;
  setStorageKey: CallableFunction;
  state: RecorderState;
  setState: CallableFunction;
  startTime: Date;
  setStartTime: CallableFunction;
}) {
  const [duration, setDuration] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  return (
    <>
      {props.selectedItem && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
            flexDirection: "column",
          }}
        >
          <h3>Deadline</h3>
          <h2 style={{ color: "#DC3545", fontWeight: "800" }}>
            {moment(props.selectedItem.end_date).format("YYYY/MM/DD")}
          </h2>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#1a4499",
              marginTop: "10px",
              // height: "40px",
              borderRadius: "20px",
            }}
          >
            <h3
              style={{
                color: "#FFFFFF",
                margin: 0,
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              {props.cardType === "Project" &&
                props.selectedItem.item + " - " + props.selectedItem.task}
              {props.cardType === "Department" && props.selectedItem.item}
            </h3>
          </div>
          {props.state === RecorderState.Starter && (
            <RecorderStarter
              setState={props.setState}
              setStartTime={props.setStartTime}
              setDuration={setDuration}
              storageKey={props.storageKey}
              selectedItem={props.selectedItem}
            />
          )}
          {props.state === RecorderState.Timer && (
            <RecorderTimer
              setState={props.setState}
              startTime={props.startTime}
              setDuration={setDuration}
              checkIn={props.checkIn}
              setCheckIn={props.setCheckIn}
              checkOut={props.checkOut}
              setCheckOut={props.setCheckOut}
              secondsElapsed={secondsElapsed}
              setSecondsElapsed={setSecondsElapsed}
              storageKey={props.storageKey}
            />
          )}
          {props.state === RecorderState.Confirm && props.startTime && (
            <RecorderConfirm
              startTime={props.startTime}
              duration={duration}
              setDuration={setDuration}
              setState={props.setState}
              id={props.id}
              user={props.user}
              task={props.selectedItem}
              projectData={props.projectData}
              setHasError={props.setHasError}
              setIsLoading={props.setIsLoading}
              setSelectedItem={props.setSelectedItem}
              checkIn={props.checkIn}
              setCheckIn={props.setCheckIn}
              checkOut={props.checkOut}
              setCheckOut={props.setCheckOut}
              member={props.member}
            />
          )}
          {props.state === RecorderState.Editor && (
            <RecorderEditor
              setState={props.setState}
              duration={duration}
              setDuration={setDuration}
              checkIn={props.checkIn}
              setCheckIn={props.setCheckIn}
              checkOut={props.checkOut}
              setCheckOut={props.setCheckOut}
            />
          )}
        </div>
      )}
    </>
  );
}
