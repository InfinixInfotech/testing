import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllEmpCodeName, getMailByEmpIdApi, getSmsByIdApi, postMailApi, updateMailApi } from "../apis/sendMailApi";

export const postMailThunk = createAsyncThunk( 
    'sendMail/postMail',
    async(param, {rejectWithValue})=>{
        try {
            const response = await postMailApi(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const updateMailThunk = createAsyncThunk( 
    'sendMail/updateMail',
    async(param, {rejectWithValue})=>{
        try {
            const response = await updateMailApi(param);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);


export const getAllEmpCodeNameThunk = createAsyncThunk(
    'sendMail/getAllEmpCodeName',
    async(_, {rejectWithValue})=>{
        try {
            const response = await getAllEmpCodeName();
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const getMailByEmpIdThunk = createAsyncThunk(
    'sendMail/getMailByEmpId',
    async(query, {rejectWithValue})=>{
        try {
            const response = await getMailByEmpIdApi(query);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

export const getSmsByIdThunk = createAsyncThunk(
    'sendMail/getSmsById',
    async(query, {rejectWithValue})=>{
        try {
            const response = await getSmsByIdApi(query);
            return response;
        } catch (error) {
           return rejectWithValue(error);
        }
    }
);

// export const deleteLeadSourceThunk = createAsyncThunk(
//     'leadsource/deleteLeadSource',
//     async (id, { rejectWithValue }) => {
//       try {
//         const response = await deleteLeadSource(id); // Assuming you are passing the id in the body
//         if (response?.success) {
//           return response; // Return the successful response data
//         }
//         return rejectWithValue(response?.message || 'Failed to delete lead status');
//       } catch (error) {
//         return rejectWithValue(error.message || 'An error occurred while deleting lead status');
//       }
//     }
//   );

// export const putLeadSourceThunk = createAsyncThunk(
//     'leadsource/putLeadSource',
//     async(param, {rejectWithValue}) => {
//         try {
//             const response = await putLeadSource(param);
//             if (response?.success) {
//                 return response;
//             }
//             return rejectWithValue(response?.message || 'Failed to update lead status');
//         } catch (error) {
//             return rejectWithValue(error.message || 'An error occurred while updating lead status');
//         }
//     }
// );

// export const getByIdLeadSourceThunk = createAsyncThunk(
//     'leadsource/getByIdLeadSource',
//     async(param, {rejectWithValue}) => {
//         try {
//             const response = await getByIdLeadSource(param);
//             if (response?.success) {
//                 return response.data;
//             }
//             return rejectWithValue(response?.message || 'Failed to fetch lead status by ID');
//         } catch (error) {
//             return rejectWithValue(error.message || 'An error occurred while fetching lead status by ID');
//         }
//     }
// );