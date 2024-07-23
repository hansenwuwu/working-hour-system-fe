import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./TimeCard.css";
import { Button } from "antd";
import { getProjectDetail } from "../lib/api";
import { ProjectData, MemberData, TaskData } from "../lib/models";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { ErrorPage } from "./ErrorPage";
import { Loading } from "./Loading";
import { MainBody } from "./MainBody";
import { RecorderState } from "./utils";

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
  const [state, setState] = useState<RecorderState>(RecorderState.Starter);
  const [startTime, setStartTime] = useState<Date>(new Date());

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

    getProjectDetail(id)
      .then((value: ProjectData) => {
        const foundMember = value.members.find(
          (data) => data.jobNumber === user
        );
        if (foundMember === undefined) {
          setHasError(true);
          return;
        }

        setMembers(value.members);
        setMember(foundMember);

        value.tasks = value.tasks.filter(
          (task) =>
            task.type === milestone &&
            task.member === foundMember.englishName &&
            task.status === "On-going"
        );

        setProjectData(value);
        setCardType(value.cardType);
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

      const storedStartTime = localStorage.getItem(
        curStorageKey + "_startTime"
      );
      const storedTask = localStorage.getItem(curStorageKey + "_task");
      const storedItem = localStorage.getItem(curStorageKey + "_item");

      if (storedTask && storedStartTime) {
        const foundTask = projectData.tasks.find((task) => {
          if (task.task != storedTask) {
            return false;
          }
          if (cardType == "Project" && task.item != storedItem) {
            return false;
          }
          return true;
        });

        if (foundTask) {
          setState(RecorderState.Timer);
          setStartTime(new Date(storedStartTime));
          setSelectedItem(foundTask);
        }
      }
    }
  }, [projectData, members, cardType]);

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
            storageKey={storageKey}
            setStorageKey={setStorageKey}
            state={state}
            setState={setState}
            startTime={startTime}
            setStartTime={setStartTime}
          />
        )}
      </div>
    </>
  );
}

export default TimeCard;
