import axios from "axios";
import { ProjectData, MemberData } from "./models";

const HOST_URL =
  "https://script.google.com/macros/s/AKfycbw5Rhnfs9OQDsIsqNUJExYMhb0EAk0kgRBtni2dFvMMbo8pBBrpFY4zviDxtcpvVpRj/exec";

export const getTasks = (sheetId: string) => {
  return new Promise<ProjectData>((resolve, reject) => {
    const scriptUrl = `${HOST_URL}?apiType=getProject&sheetId=${sheetId}`;

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
    const scriptUrl = `${HOST_URL}?apiType=getMembers&sheetId=${sheetId}`;

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
  task: string,
  checkIn: Date | null,
  checkOut: Date | null
) => {
  return new Promise((resolve, reject) => {
    const scriptUrl = `https://pctool.micadat.com/api/work_hour/`;

    let body: any = {
      project_name: project,
      deliverable: milestone,
      task: task,
      member: userId,
      work_hour: duration,
      check_in: null,
      check_out: null,
    };
    if (checkIn) {
      body.check_in = checkIn.toISOString();
    }
    if (checkOut) {
      body.check_out = checkOut.toISOString();
    }

    axios
      .post(scriptUrl, body)
      .then((res) => {
        console.log("upload working hours success: ", res);
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
