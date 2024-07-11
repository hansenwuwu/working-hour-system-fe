import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./TimeCard.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Result, Spin } from "antd";
import { getTasks, getMembers, uploadWorkingHours } from "../lib/api";
import { ProjectData, MemberData, TaskData } from "../lib/models";
import moment from "moment";
import {
  EditOutlined,
  PlayCircleOutlined,
  LogoutOutlined,
  LoadingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

enum RecorderState {
  Starter = "starter",
  Timer = "timer",
  Editor = "editor",
  Confirm = "confirm",
  Result = "result",
}

function RenderTasks(props: {
  projectData: ProjectData;
  setSelectedItem: CallableFunction;
  cardType: string | undefined;
}) {
  const [uniqueItems, setUniqueItems] = useState<TaskData[]>([]);

  useEffect(() => {
    if (props.cardType === "Project") {
      setUniqueItems(props.projectData.tasks);
    } else if (props.cardType === "Department") {
      setUniqueItems(
        Array.from(
          props.projectData.tasks
            .reduce((map, obj) => map.set(obj.item, obj), new Map())
            .values()
        )
      );
    }
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginBottom: "30px",
          marginTop: "10px",
        }}
      >
        {uniqueItems.map((task, index) => {
          return (
            <Button
              className="btn"
              key={index}
              onClick={() => {
                props.setSelectedItem(task);
              }}
            >
              {props.cardType === "Project" && task.item + " - " + task.task}
              {props.cardType === "Department" && task.item}
            </Button>
          );
        })}
      </div>
    </>
  );
}

function RecorderStarter(props: {
  setState: CallableFunction;
  setStartTime: CallableFunction;
  setDuration: CallableFunction;
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
              props.setStartTime(new Date());
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

function RecorderTimer(props: {
  setState: CallableFunction;
  startTime: Date;
  setDuration: CallableFunction;
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
            backgroundColor: "#DC3545",
            marginTop: "10px",
            height: "40px",
            borderRadius: "20px",
          }}
        >
          <h3 style={{ color: "#FFFFFF", margin: 0 }}>In Progress</h3>
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
              const now = new Date();
              let seconds = now.getTime() - props.startTime.getTime();
              seconds = seconds / 1000;
              console.log("Actual seconds = ", seconds);
              const hours = Math.ceil((seconds / 3600) * 10) / 10;
              props.setDuration(hours);
              props.setState(RecorderState.Confirm);
            }}
          />
          <h2>Check Out</h2>
        </div>
      </div>
    </>
  );
}

function RecorderConfirm(props: {
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
                props.user,
                props.projectData.project,
                props.task.type,
                props.task.item,
                props.duration,
                props.task.task
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

function RecorderEditor(props: {
  setState: CallableFunction;
  duration: number;
  setDuration: CallableFunction;
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
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

function Recorder(props: {
  projectData: ProjectData;
  selectedItem: TaskData;
  setSelectedItem: CallableFunction;
  id: string | null;
  user: string | null;
  setHasError: CallableFunction;
  setIsLoading: CallableFunction;
  cardType: string | undefined;
}) {
  const [state, setState] = useState<RecorderState>(RecorderState.Starter);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(0);

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
            />
          )}
          {state === RecorderState.Timer && (
            <RecorderTimer
              setState={setState}
              startTime={startTime}
              setDuration={setDuration}
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
            />
          )}
          {state === RecorderState.Editor && (
            <RecorderEditor
              setState={setState}
              duration={duration}
              setDuration={setDuration}
            />
          )}
        </div>
      )}
    </>
  );
}

function ErrorPage() {
  return (
    <>
      <div
        className="tc_container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Result status="warning" title="Sorry, the page cannot be found." />
      </div>
    </>
  );
}

function MainBody(props: {
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
}) {
  return (
    <div
      style={{
        marginLeft: "30px",
        marginRight: "30px",
      }}
    >
      {props.member && (
        <div className="tc_avatar_container">
          <Avatar size={64} icon={<UserOutlined />} />
          <h3>{props.member.englishName}</h3>
        </div>
      )}
      {props.projectData?.project && (
        <div className="tc_project_container">
          <h3 style={{ marginBottom: "20px", fontWeight: "300" }}>
            {props.projectData?.project}
          </h3>
        </div>
      )}
      {props.milestone && (
        <div className="tc_type_container">
          <h2 style={{ marginBottom: "20px" }}>{props.milestone}</h2>
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
      {props.projectData && props.selectedItem && (
        <Recorder
          projectData={props.projectData}
          selectedItem={props.selectedItem}
          setSelectedItem={props.setSelectedItem}
          id={props.id}
          user={props.user}
          setHasError={props.setHasError}
          setIsLoading={props.setIsLoading}
          cardType={props.cardType}
        />
      )}
    </div>
  );
}

function Loading() {
  return (
    <>
      <div
        className="tc_container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    </>
  );
}

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
    // console.log("projectData: ", projectData);
    // console.log("members: ", members);
  }, [members, projectData]);

  useEffect(() => {
    if (projectData && members) {
      setIsLoading(false);
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
          />
        )}
      </div>
    </>
  );
}

export default TimeCard;
