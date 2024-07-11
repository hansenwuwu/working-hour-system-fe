import React, { useEffect, useState, useRef } from "react";
import { Avatar, Button, Input, Result, Spin } from "antd";
import { getTasks, getMembers, uploadWorkingHours } from "../../lib/api";
import { ProjectData, MemberData, TaskData } from "../../lib/models";
import { PageType } from "./model";

export function StarterPage(props: {
  sheetId: string;
  setSheetId: CallableFunction;
  setProjectData: CallableFunction;
  loadings: boolean[];
  enterLoading: CallableFunction;
  exitLoading: CallableFunction;
  setMembers: CallableFunction;
  setCardType: CallableFunction;
  setCurPage: CallableFunction;
}) {
  const getProjectData = (sheetId: string) => {
    const fetchData = async () => {
      props.enterLoading(1);
      try {
        const members = await getMembers(sheetId);
        props.setMembers(members);

        const projectData = await getTasks(sheetId);
        props.setProjectData(projectData);
        props.setCardType(projectData.cardType);

        props.setCurPage(PageType.GENERATOR);
      } catch (error) {
        console.error("Error:", error);
      }
      props.exitLoading(1);
    };
    fetchData();
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "900px",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Input
          size="large"
          placeholder="Google sheet ID"
          style={{ borderWidth: "3px", fontSize: "30px", height: "80px" }}
          disabled={props.loadings[1]}
          value={props.sheetId}
          onChange={(e) => {
            props.setSheetId(e.target.value);
          }}
        />
        <Button
          style={{
            marginTop: "20px",
            width: "200px",
            height: "60px",
            fontSize: "30px",
          }}
          type="primary"
          loading={props.loadings[1]}
          onClick={() => {
            getProjectData(props.sheetId);
          }}
        >
          Process
        </Button>
      </div>
    </div>
  );
}
