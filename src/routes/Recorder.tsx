import React, { useEffect, useState } from "react";
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
}) {
  const [state, setState] = useState<RecorderState>(RecorderState.Starter);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(0);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  const [storageKey, setStorageKey] = useState<string>("");

  useEffect(() => {
    if (props.selectedItem) {
      const curStorageKey = `${props.id}_${props.user}_${props.selectedItem.type}`;
      setStorageKey(curStorageKey);

      const storedTask = localStorage.getItem(curStorageKey + "_task");
      const storedStartTime = localStorage.getItem(
        curStorageKey + "_startTime"
      );
      if (storedStartTime) {
        setState(RecorderState.Timer);
        setStartTime(new Date(storedStartTime));
      }
    }
  }, [props.selectedItem]);

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
          {state === RecorderState.Starter && (
            <RecorderStarter
              setState={setState}
              setStartTime={setStartTime}
              setDuration={setDuration}
              storageKey={storageKey}
            />
          )}
          {state === RecorderState.Timer && (
            <RecorderTimer
              setState={setState}
              startTime={startTime}
              setDuration={setDuration}
              checkIn={props.checkIn}
              setCheckIn={props.setCheckIn}
              checkOut={props.checkOut}
              setCheckOut={props.setCheckOut}
              secondsElapsed={secondsElapsed}
              setSecondsElapsed={setSecondsElapsed}
              storageKey={storageKey}
            />
          )}
          {state === RecorderState.Confirm && startTime && (
            <RecorderConfirm
              startTime={startTime}
              duration={duration}
              setDuration={setDuration}
              setState={setState}
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
          {state === RecorderState.Editor && (
            <RecorderEditor
              setState={setState}
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
