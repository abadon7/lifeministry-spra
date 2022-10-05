import {
  IAssignment,
  IDataBase,
  ISchedule,
  IStudent,
} from "../types/ministry.types";
interface FetchOptions {
  method: string;
  //body: string;
}
const fetchData = async (
  url: string = "",
  data:
    | IStudent[]
    | IAssignment[]
    | IStudent
    | ISchedule
    | ISchedule[]
    | IAssignment = [],
  method: string = "GET"
) => {
  // Default options are marked with *
  console.log("Fetching data from server");
  const opt1 = {
    method: method, // *GET, POST, PUT, DELETE, etc.
  };
  let options: FetchOptions = opt1;
  if (method !== "GET") {
    const opt2 = {
      method: method, // *GET, POST, PUT, DELETE, etc.
      //mode: 'cors', // no-cors, *cors, same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      //headers: {
      //   'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      //},
      //redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    };
    options = opt2;
  }
  const response = await fetch(url, options);
  return response.json(); // parses JSON response into native JavaScript objects
};
const stdUrl = "http://localhost:7000/";

export const lifeMinistry: any = function (this: IDataBase) {
  this.getStudents = function (gender: string = "all", active: string = "all") {
    console.log("getStudents");
    return fetchData(
      stdUrl + "students?active=" + active + "&gender=" + gender
    );
  };
  this.getStudent = function (id: number = 0) {
    console.log("getStudent");
    return fetchData(stdUrl + "students/" + id);
  };
  this.addStudents = function (data: IStudent[]) {
    console.log("addStudents");
    return fetchData(stdUrl + "students", data, "POST");
  };
  this.updateStudent = function (data: IStudent) {
    console.log("updateStudent");
    return fetchData(stdUrl + "students", data, "PUT");
  };
  this.deleteStudent = function () {
    console.log("deleteStudent");
  };
  this.getAssignments = function () {
    console.log("getAssignments");
    return fetchData(stdUrl + "assignments");
  };
  this.addAssignments = function (data: IAssignment[]) {
    console.log("addAssignments");
    return fetchData(stdUrl + "assignments", data, "POST");
  };
  this.deleteAssignment = function () {
    console.log("deleteAssigment");
  };
  this.updateAssignment = function () {
    console.log("deleteAssigment");
  };
  this.getPartner = function (data: string) {
    return fetchData(stdUrl + data);
  };
  this.getSchedules = () => {
    console.log("Getting Schedule");
    return fetchData(stdUrl + "schedules");
  };
  this.addSchedule = (data: ISchedule) => {
    console.log("Adding Schedule");
    return fetchData(stdUrl + "schedules", data, "POST");
  };
  this.updateSchedule = (data: ISchedule) => {
    console.log("Updating Schedule");
  };
};
