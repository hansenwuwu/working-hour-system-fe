import React from "react";
import "./TimeCard.css";
import { Avatar } from "antd";
import { ProjectData, MemberData, TaskData } from "../lib/models";
import { importAll } from "./utils";
import { RenderTasks } from "./RenderTasks";
import { Recorder } from "./Recorder";

const avatarImages = importAll(
  require.context("../assets/avatars", false, /\.(png|jpg|svg)$/)
);

export function MainBody(props: {
  user: string | null;
  projectData: ProjectData | undefined;
  milestone: string | null;
  selectedItem: TaskData | undefined;
  setSelectedItem: CallableFunction;
  id: string | null;
  setHasError: CallableFunction;
  members: MemberData[];
  member: MemberData | undefined;
  setIsLoading: CallableFunction;
  cardType: string | undefined;
  checkIn: Date | null;
  setCheckIn: CallableFunction;
  checkOut: Date | null;
  setCheckOut: CallableFunction;
}) {
  const getAvatar = (id: string) => {
    if (id in avatarImages) {
      return avatarImages[id];
    }
    return avatarImages["T9999"];
  };

  return (
    <div
      style={{
        marginLeft: "30px",
        marginRight: "30px",
        marginTop: "70px",
      }}
    >
      {props.member && (
        <div className="tc_avatar_container">
          <Avatar size={64} src={getAvatar(props.member.jobNumber)} />
          <h3 style={{ textAlign: "center" }}>{props.member.englishName}</h3>
        </div>
      )}
      {props.projectData?.project && (
        <div className="tc_project_container">
          <h3
            style={{
              marginBottom: "20px",
              fontWeight: "300",
              textAlign: "center",
            }}
          >
            {props.projectData?.project}
          </h3>
        </div>
      )}
      {props.milestone && (
        <div className="tc_type_container">
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
            {props.milestone}
          </h2>
        </div>
      )}

      {props.projectData && !props.selectedItem && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            <h3 style={{ fontWeight: "400" }}>Choose your task</h3>
          </div>
          <RenderTasks
            projectData={props.projectData}
            setSelectedItem={props.setSelectedItem}
            cardType={props.cardType}
          />
        </>
      )}
      {props.projectData && props.selectedItem && props.member && (
        <Recorder
          projectData={props.projectData}
          selectedItem={props.selectedItem}
          setSelectedItem={props.setSelectedItem}
          id={props.id}
          user={props.user}
          setHasError={props.setHasError}
          setIsLoading={props.setIsLoading}
          cardType={props.cardType}
          checkIn={props.checkIn}
          setCheckIn={props.setCheckIn}
          checkOut={props.checkOut}
          setCheckOut={props.setCheckOut}
          member={props.member}
        />
      )}
    </div>
  );
}
