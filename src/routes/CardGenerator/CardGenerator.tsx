import React, { useState } from "react";
import cardTemplate from "../assets/images/card.jpg";
import "../TimeCard.css";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { ProjectData, MemberData } from "../../lib/models";
import { StarterPage } from "./StarterPage";
import { GeneratorPage } from "./GeneratorPage";
import { PageType } from "./model";

function CardGenerator() {
  const [curPage, setCurPage] = useState<PageType>(PageType.STARTER);

  const [sheetId, setSheetId] = useState<string>("");
  const [projectData, setProjectData] = useState<ProjectData>();
  const [members, setMembers] = useState<MemberData[]>([]);
  const [cardType, setCardType] = useState<string>("");

  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const exitLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  return (
    <>
      <div className="tc_container">
        <div className="tc_header">
          {curPage === PageType.GENERATOR && (
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
                setCurPage(PageType.STARTER);
              }}
            />
          )}
          <h1>ADAT</h1>
        </div>
        {curPage === PageType.STARTER && (
          <StarterPage
            sheetId={sheetId}
            setSheetId={setSheetId}
            setProjectData={setProjectData}
            loadings={loadings}
            enterLoading={enterLoading}
            exitLoading={exitLoading}
            setMembers={setMembers}
            setCardType={setCardType}
            setCurPage={setCurPage}
          />
        )}
        {curPage === PageType.GENERATOR && projectData && (
          <GeneratorPage
            sheetId={sheetId}
            setSheetId={setSheetId}
            projectData={projectData}
            setProjectData={setProjectData}
            loadings={loadings}
            enterLoading={enterLoading}
            exitLoading={exitLoading}
            members={members}
            setMembers={setMembers}
            setCardType={setCardType}
          />
        )}
      </div>
    </>
  );
}

export default CardGenerator;
