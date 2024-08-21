import axios from "axios";
import { ProjectData, MemberData, WorkingHourRecord } from "./models";

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
  checkOut: Date | null,
  cardType: string
) => {
  return new Promise((resolve, reject) => {
    const scriptUrl = `https://pctool.micadat.com/api/work_hour/`;

    let output_task = "";
    if (cardType.toLowerCase() == "department") {
      output_task = item;
    } else if (cardType.toLowerCase() == "project") {
      output_task = item + ", " + task;
    }

    let body: any = {
      project_name: project,
      deliverable: milestone,
      task: output_task,
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

export const getProjectDetail = (sheetId: string) => {
  return new Promise<ProjectData>((resolve, reject) => {
    const scriptUrl = `${HOST_URL}?apiType=getProjectDetail&sheetId=${sheetId}`;

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

export const getWorkingHourRecords = (
  memberName: string,
  projectName: string
) => {
  return new Promise<WorkingHourRecord[]>((resolve, reject) => {
    const scriptUrl = `http://192.168.3.67:8080/api/work_hour/`;

    axios
      .get(scriptUrl, {
        params: {
          member: memberName,
          project_name: projectName,
        },
      })
      .then((response) => {
        const records: WorkingHourRecord[] = [];
        response.data.forEach((item: any) => {
          records.push(item);
        });
        resolve(records);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
