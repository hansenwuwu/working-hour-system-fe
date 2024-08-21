export class ProjectData {
  project: string;
  cardType: string;
  tasks: TaskData[];
  members: MemberData[];

  constructor(data: {
    project: string;
    cardType: string;
    tasks: any[];
    members: any[];
  }) {
    this.project = data.project;
    this.cardType = data.cardType;
    this.tasks = data.tasks.map((task) => new TaskData(task));
    this.members = data.members.map((member) => new MemberData(member));
  }
}

export class TaskData {
  type: string;
  item: string;
  hash: string;
  task: string;
  member: string;
  member_type: string;
  status: string;
  start_date: Date;
  end_date: Date;

  constructor(data: {
    type: string;
    item: string;
    hash: string;
    task: string;
    member: string;
    member_type: string;
    status: string;
    start_date: string;
    end_date: string;
  }) {
    this.type = data.type;
    this.item = data.item;
    this.hash = data.hash;
    this.task = data.task;
    this.member = data.member;
    this.member_type = data.member_type;
    this.status = data.status;
    this.start_date = new Date(data.start_date);
    this.end_date = new Date(data.end_date);
  }
}

export class MemberData {
  department: string;
  jobNumber: string;
  chineseName: string;
  englishName: string;

  constructor(data: {
    department: string;
    jobNumber: string;
    chineseName: string;
    englishName: string;
  }) {
    this.department = data.department;
    this.jobNumber = data.jobNumber;
    this.chineseName = data.chineseName;
    this.englishName = data.englishName;
  }
}

export class WorkingHourRecord {
  projectName: string;
  deliverable: string;
  task: string;
  member: string;
  checkIn: string;
  checkOut: string;
  workHour: number;

  constructor(data: {
    project_name: string;
    deliverable: string;
    task: string;
    member: string;
    check_in: string;
    check_out: string;
    work_hour: number;
  }) {
    this.projectName = data.project_name;
    this.deliverable = data.deliverable;
    this.task = data.task;
    this.member = data.member;
    this.checkIn = data.check_in;
    this.checkOut = data.check_out;
    this.workHour = data.work_hour;
  }
}
