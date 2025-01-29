import { apiDeleteCallWithAuth, apiGetCallWithAuth, apiPostCallWithAuth, apiPostCallWithAuthFormData, apiPutCallWithAuth } from "../../../Utils/apiUtils";
import {
  getAllEmpCodeNameUrl,
  getMailByIdUrl,
  getSMSByIdUrl,
  postMailUrl,
  staticToken,
  updateSMSByIdUrl,
} from "../apiServer/ApiServer";



export const postMailApi = async (params) => {
  try {
    const response = await apiPostCallWithAuthFormData(
      postMailUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateMailApi = async (params) => {
  try {
    const response = await apiPutCallWithAuth(
      updateSMSByIdUrl,
      params,
      staticToken
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAllEmpCodeName = async () => {
    try {
      const response = await apiGetCallWithAuth(getAllEmpCodeNameUrl, staticToken);
      return response;
  
    } catch (error) {
      return null;
    }
  };


export const getMailByEmpIdApi = async (query) => {
    try {
      const response = await apiGetCallWithAuth(`${getMailByIdUrl}?employeeCode=${query}`, staticToken);
      return response;
  
    } catch (error) {
      return null;
    }
  };


export const getSmsByIdApi = async (query) => {
    try {
      const response = await apiGetCallWithAuth(`${getSMSByIdUrl}?id=${query}`, staticToken);
      return response;
  
    } catch (error) {
      return null;
    }
  };

  


export const deleteLeadSource = async (id) => {
  try {
    const urlWithId = `${deleteLeadSourceUrl}?id=${id}`;
    const response = await apiDeleteCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error deleting lead status:", error);
    return { success: false, message: error.message || 'An error occurred' };
  }
};

export const putLeadSource = async (params) => {
  try {
    const urlWithId = `${putLeadSourceUrl}?id=${id}`;
    const response = await apiPutCallWithAuth(urlWithId, params, staticToken);
    return response; 
  } catch (error) {
    console.error("Error updating lead status:", error);
    return null;
  }
};

export const getByIdLeadSource = async (id) => {
  try {
    const urlWithId = `${getByIdLeadSourceUrl}?id=${id}`;
    const response = await apiGetCallWithAuth(urlWithId, staticToken);
    return response; 
  } catch (error) {
    console.error("Error getting lead status by ID:", error);
    return null;
  }
};
