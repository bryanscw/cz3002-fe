const API_ADDR = process.env.REACT_APP_API_ADDR;

//export const API_URL = `http://${API_ADDR}:8080/cogbench/api`;
export const API_URL = 'http://172.21.148.165:8080/cogbench/api';

export const USER_ROLES = {
  PATIENT: "ROLE_PATIENT",
  DOCTOR: "ROLE_DOCTOR",
  ADMIN: "ROLE_ADMIN"
};

export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";
export const EMPTY = "EMPTY";

// color for dots to pick from list
export const COLORS = ['#ffffff00'];

// size vales for dots to pick from list
export const SIZES = [35];
