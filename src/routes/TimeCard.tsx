import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./TimeCard.css";
import { Button } from "antd";
import { getTasks, getMembers } from "../lib/api";
import { ProjectData, MemberData, TaskData } from "../lib/models";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ErrorPage } from "./ErrorPage";
import { Loading } from "./Loading";
import { MainBody } from "./MainBody";

function TimeCard() {
  const [searchParams] = useSearchParams();

  const user = searchParams.get("user");
  const id = searchParams.get("id");
  const milestone = searchParams.get("milestone");

  const [projectData, setProjectData] = useState<ProjectData>();
  const [members, setMembers] = useState<MemberData[]>([]);

  const [member, setMember] = useState<MemberData>();

  const [cardType, setCardType] = useState<string>("");

  const [selectedItem, setSelectedItem] = useState<TaskData>();

  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const [storageKey, setStorageKey] = useState<string>("");

  useEffect(() => {
    if (id === null || user === null) {
      setHasError(true);
      return;
    }

    // Check if dep card needs milestone
    if (milestone === null) {
      setHasError(true);
      return;
    }

    getMembers(id)
      .then((data: MemberData[]) => {
        const foundMember = data.find((data) => data.jobNumber === user);
        if (foundMember === undefined) {
          setHasError(true);
          return;
        }

        setMembers(data);
        setMember(foundMember);

        getTasks(id)
          .then((data: ProjectData) => {
            // filter task with Status, Deliverable, Task member
            data.tasks = data.tasks.filter(
              (task) =>
                task.type === milestone &&
                task.member === foundMember.englishName &&
                task.status === "On-going"
            );

            setProjectData(data);
            setCardType(data.cardType);
          })
          .catch((error: any) => {
            setHasError(true);
            console.error("Failed to fetch data:", error);
          });
      })
      .catch((error: any) => {
        setHasError(true);
        console.error("Failed to fetch data:", error);
      });
  }, [id, milestone, user]);

  useEffect(() => {
    if (projectData && members) {
      setIsLoading(false);

      const curStorageKey = `${id}_${user}_${milestone}`;
      setStorageKey(curStorageKey);

      const storedTask = localStorage.getItem(curStorageKey + "_task");
      const storedStartTime = localStorage.getItem(
        curStorageKey + "_startTime"
      );

      if (storedTask && storedStartTime) {
        // setState(RecorderState.Timer);
        // setStartTime(new Date(storedStartTime));
      }
    }
  }, [projectData, members]);

  return (
    <>
      <div className="tc_container">
        <div className="tc_header">
          {selectedItem && (
            <Button
              type="text"
              shape="circle"
              icon={<ArrowLeftOutlined style={{ fontSize: "20px" }} />}
              style={{
                padding: "20px 20px",
                fontSize: "20px",
                color: "#FFFFFF",
                position: "absolute",
                left: "10px",
              }}
              onClick={() => {
                setSelectedItem(undefined);
              }}
            />
          )}

          <h1>ADAT</h1>
        </div>

        {hasError ? (
          <ErrorPage />
        ) : isLoading ? (
          <Loading />
        ) : (
          <MainBody
            user={user}
            projectData={projectData}
            milestone={milestone}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            id={id}
            setHasError={setHasError}
            members={members}
            member={member}
            setIsLoading={setIsLoading}
            cardType={cardType}
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            checkOut={checkOut}
            setCheckOut={setCheckOut}
          />
        )}
      </div>
    </>
  );
}

export default TimeCard;
