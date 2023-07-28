import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addUserProjectType,
  userProjectByUserType,
} from "../../../types/userProject";
import { baseUrl } from "../../../utils/url";
import {getAllProjectItem} from "../../../types/userProject";

type stateType = {
  loading: boolean;
  userProjectByUser: userProjectByUserType[];
  allProject: getAllProjectItem[];
};

const initialState: stateType = {
  loading: false,
  userProjectByUser: [] as userProjectByUserType[],
  allProject: [] as getAllProjectItem[],
};

export const fetchAllProject = createAsyncThunk("allProject", async () => {
  const response = await axios.get(baseUrl + "UserProject/GetListUserAccess");
  return response.data;
});

export const getUserProjectById = createAsyncThunk(
  "getUserProjectById",
  async () => {
    const response = await axios.get(baseUrl + `UserProject/GetListNonPagingById`);
    return response.data;
  }
);

export const addUserProject = createAsyncThunk(
  "addUserProject",
  async (addUserProject: addUserProjectType) => {
    const response = await axios.post(
      baseUrl + `UserProject/Add`,
      addUserProject
    );
    return response.data;
  }
);

export const deleteUserProject = createAsyncThunk<
  number,
  {
    UserId: number | undefined;
    projectId: number;
  }
>("deleteUserProject", async ({ projectId, UserId }) => {
  const response = await axios.delete(
    baseUrl + `UserProject/Delete?UserId=${UserId}&ProjectId=${projectId}`
  );
  return response.data;
});

const userProjectSlice = createSlice({
  name: "userProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProjectById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProjectById.fulfilled, (state, action) => {
      state.loading = false;
      state.userProjectByUser = action.payload;
    });
    builder.addCase(getUserProjectById.rejected, (state) => {
      state.loading = false;
    });

    // ADD
    builder.addCase(addUserProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUserProject.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(addUserProject.rejected, (state) => {
      state.loading = false;
    });

    // DELETE
    builder.addCase(deleteUserProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUserProject.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(deleteUserProject.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchAllProject.pending, (state) => {
      state.loading = true;
    } );
    builder.addCase(fetchAllProject.fulfilled, (state, action) => {
      state.loading = false;
      state.allProject = action.payload;
    } );
    builder.addCase(fetchAllProject.rejected, (state) => {
      state.loading = false;
    } );

  },
});

export default userProjectSlice.reducer;
