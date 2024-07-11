import React, { useEffect, useState, useRef } from "react";
import cardTemplate from "../assets/images/card.jpg";
import "../TimeCard.css";
import { Avatar, Button, Input, Result, Spin } from "antd";
import {
  EditOutlined,
  PlayCircleOutlined,
  LogoutOutlined,
  LoadingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import { ProjectData, MemberData, TaskData } from "../../lib/models";
import { StarterPage } from "./StarterPage";
import { GeneratorPage } from "./GeneratorPage";
import { PageType } from "./model";

function CardGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [downloadLink, setDownloadLink] = useState<string>("");

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

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;

  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   const image = new Image();
  //   image.src = cardTemplate;
  //   image.onload = () => {
  //     canvas.width = image.width;
  //     canvas.height = image.height;
  //     ctx.drawImage(image, 0, 0);

  //     ctx.font = "30px Arial";
  //     ctx.fillStyle = "red";
  //     ctx.fillText("Your Text Here", 50, 50); // 调整文本位置

  //     const dataUrl = canvas.toDataURL("image/png");
  //     setDownloadLink(dataUrl);
  //   };
  // }, []);

  return (
    <>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        {downloadLink && (
          <a
            style={{ fontSize: "50px" }}
            href={downloadLink}
            download="modified-image.png"
          >
            Download Image
          </a>
        )}
        <canvas ref={canvasRef}></canvas>
      </div> */}
      <div className="tc_container">
        <div className="tc_header">
          {true && (
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
                // setSelectedItem(undefined);
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
