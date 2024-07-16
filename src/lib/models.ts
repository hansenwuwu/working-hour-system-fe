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
  department: string;
  jobNumber: string;
  chineseName: string;
  englishName: string;

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
    department: string;
    jobNumber: string;
    chineseName: string;
    englishName: string;
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
    this.department = data.department;
    this.jobNumber = data.jobNumber;
    this.chineseName = data.chineseName;
    this.englishName = data.englishName;
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
