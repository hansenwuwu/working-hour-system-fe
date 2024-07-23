import React, { useEffect, useState } from "react";
import "./TimeCard.css";
import { Button } from "antd";
import { ProjectData, TaskData } from "../lib/models";

export function RenderTasks(props: {
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
