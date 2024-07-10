import axios from "axios";
import { ProjectData, MemberData } from "./models";

export const getTasks = (sheetId: string) => {
  return new Promise<ProjectData>((resolve, reject) => {
    const scriptUrl = `https://script.google.com/macros/s/AKfycbx7-Jss8FzhGWP2h9Lbs7O6rqIaCRAKiaTXmhXqwAH7DIq-8HFc6f95Q6ZhW8LKpA9kLw/exec?sheetId=${sheetId}`;

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
  duration: number,
  task: string
) => {
  return new Promise((resolve, reject) => {
    const scriptUrl = `https://script.google.com/macros/s/AKfycbyozzEznU6gbq5mX6qyQoTf9G-xPD0eczTmW1gNnUKDg9bkm3X8qUX2qcnPew1mlQeuKA/exec?sheetId=${sheetId}&userId=${userId}&project=${project}&milestone=${milestone}&item=${item}&duration=${duration}&task=${task}`;
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
