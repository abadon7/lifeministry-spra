export interface IStudent {
  id: number;
  name: string;
  gender: string;
  active: boolean;
  notes: string;
  cel: number;
  last: string;
  lastpartner: number;
}

export interface IAssignment {
  id: number;
  name: string;
  type: string;
  participants: number;
}

export interface WeeksList {
  start: Date;
  end: Date;
}

export interface ISchedule {
  id: number;
  data: string;
  range: string;
}

export interface IDataBase {
  //[x: string]: (data: IStudent[])  => Promise<any>;
  getStudents: () => any;
  getStudent: () => any;
  addStudents: (data: IStudent[]) => any;
  updateStudent: (data: IStudent) => any;
  deleteStudent: (data: IStudent[]) => any;
  getAssignments: () => any;
  addAssignments: (data: IAssignment[]) => any;
  deleteAssignment: (data: IAssignment[]) => any;
  updateAssignment: (data: IAssignment) => any;
  getPartner: (data: string) => any;
  getSchedules: () => any;
  addSchedule: (data: ISchedule) => any;
  updateSchedule: (data: ISchedule) => any;
}

type tpOptions = {
  [key: string]: boolean;
};

export interface TimeOpts extends tpOptions {
  week: boolean;
  month: boolean;
}

