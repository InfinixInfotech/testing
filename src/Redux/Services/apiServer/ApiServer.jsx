import React from 'react';
const isLive = false;
const envUrl = import.meta.env.VITE_API_URL;
const apiUrl = isLive ? envUrl : '';
  
//-----------------------------------LeadStatus Api's------------------------------------------------------------------
export const getAllEmpCodeNameUrl = `${apiUrl}/api/SMS/GetAllEmployeeCodeAndName`;
export const postMailUrl = `${apiUrl}/api/SMS/AddSMS`;
export const getMailByIdUrl = `${apiUrl}/api/SMS/GetSMSByEmployeeCode`;
export const getSMSByIdUrl = `${apiUrl}/api/SMS/GetSMSById`;
export const updateSMSByIdUrl = `${apiUrl}/api/SMS/UpdateSMSById`;


export const staticToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5Njk3YjZmNC0xZTU0LTQ3MjgtYjMzMC0xMzVlMDlkMTIxMTciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJ1c2VyIiwiaWF0IjoxNzM0OTU0NDYwLCJleHAiOjE3NjY0OTA0NjAsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcyODIvIn0.SLSTBNIK8uJGNP6AWUHkC891T--5sKy_bjol7vCQnw0`


export default function ApiServer() {
  return (
    <div>ApiServer</div>
  )
}
