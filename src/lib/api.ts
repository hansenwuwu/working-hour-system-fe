import axios from "axios";
import { ProjectData, MemberData } from "./models";

export const getTasks = (sheetId: string) => {
  return new Promise<ProjectData>((resolve, reject) => {
    const scriptUrl = `https://script.google.com/macros/s/AKfycbzX1e8k3Rssd0rg37ygdYOGMuMq158QBi9KEIDg3TmtJRyYrmKD8QUV2zte6HgjjD7tYg/exec?sheetId=${sheetId}`;

    axios
      .get(scriptUrl)
      .then((response) => {
        const project: ProjectData = new ProjectData(response.data);
        resolve(project);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getMembers = (sheetId: string) => {
  return new Promise<MemberData[]>((resolve, reject) => {
    const scriptUrl = `https://script.google.com/macros/s/AKfycbygWit34StuZWbX-p_AHgKd_xMYYUpJfJDepd7Czc3IsJHxln1p6EWpQRokE-olC4Zz/exec?sheetId=${sheetId}`;

    axios
      .get(scriptUrl)
      .then((response) => {
        // console.log("reposne.data: ", response.data);
        const members: MemberData[] = response.data.members.map(
          (member: any) =>
            new MemberData({
              department: member["Department"],
              jobNumber: member["Job Number"],
              chineseName: member["CN"],
              englishName: member["EN"],
            })
        );
        resolve(members);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const uploadWorkingHours = (
  sheetId: string,
  userId: string | null,
  project: string,
  milestone: string,
  item: string,
  duration: number
) => {
  return new Promise((resolve, reject) => {
    const scriptUrl = `https://script.google.com/macros/s/AKfycbwHeWhpKTB5aYgngnxyNudsAld2uobn2SmJZrSR96JNdRmAH-nQIEa4LUxNseaTLSQeZg/exec?sheetId=${sheetId}&userId=${userId}&project=${project}&milestone=${milestone}&item=${item}&duration=${duration}`;
    axios
      .get(scriptUrl)
      .then(() => {
        resolve(0);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
