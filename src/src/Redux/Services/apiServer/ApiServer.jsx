import React from 'react';
const isLive = true;
const envUrl = import.meta.env.VITE_API_URL;
const apiUrl = isLive ? envUrl : '';
  

export const getAllEmpCodeNameUrl = `${apiUrl}/api/SMS/GetAllEmployeeCodeAndName`;
export const postMailUrl = `${apiUrl}/api/SMS/AddSMS`;
export const getMailByIdUrl = `${apiUrl}/api/SMS/GetSMSByEmployeeCode`;
export const getSMSByIdUrl = `${apiUrl}/api/SMS/GetSMSById`;
export const updateSMSByIdUrl = `${apiUrl}/api/SMS/UpdateSMSById`;
export const loginUrl = `${apiUrl}/api/Auth/login`;



export const staticToken = localStorage.getItem("authToken");
export const empCode = localStorage.getItem("empCode");
export const userName = localStorage.getItem("userName");



export default function ApiServer() {
  return (
    <div>ApiServer</div>
  )
}
