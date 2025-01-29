import { createSlice } from "@reduxjs/toolkit";
import { getAllEmpCodeNameThunk, getMailByEmpIdThunk, getSmsByIdThunk, postMailThunk, updateMailThunk } from "../Services/thunks/sendMailThunk";

const sendMailReducer = createSlice({
  name: "sendMail",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      //Post Mail Reducer
      .addCase(postMailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postMailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postMailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // For getAllEmpCodeNameThunk
      .addCase(getAllEmpCodeNameThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmpCodeNameThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllEmpCodeNameThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //get all mail by emp id reducer
      .addCase(getMailByEmpIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMailByEmpIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getMailByEmpIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      //get mail by id reducer
      .addCase(getSmsByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSmsByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSmsByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    //   // For getAllLeadStatusThunk
    //   .addCase(deleteLeadSourceThunk.pending, (state) => {
    //     state.loading = true;
    //     state.deleteError = null;
    //   })
    //   .addCase(deleteLeadSourceThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.deleteSuccess = true;        
    //     // state.data =state.data.filter(item => item.id !== action.payload.id);
    //   })
    //   .addCase(deleteLeadSourceThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.deleteError = action.payload;
    //   })
      
     
      .addCase(updateMailThunk.pending, (state) => {
        state.loading = true;
        state.putError = null;
      })
      .addCase(updateMailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.putSuccess = true;        
        state.data = action.payload;
      })
      .addCase(updateMailThunk.rejected, (state, action) => {
        state.loading = false;
        state.putError = action.payload;
      })
      
    //   .addCase(getByIdLeadSourceThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getByIdLeadSourceThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.data = action.payload;
    //   })
    //   .addCase(getByIdLeadSourceThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
  },
});

export default sendMailReducer.reducer;
