import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAllProjectPagingRes,
  addProjectFormType,
  updateProjectFormType,
  projectState,
  getAllProjectItem,
  projectFormVal,
} from "../../../types/project";
import { baseUrl } from "../../../utils/url";
import planSlice from "./planSlice";

type PagePageSizeType = {
  page: number;
  pageSize: number;
};

const initialState: projectState = {
  allProjectPaging: {} as getAllProjectPagingRes,
  allProject: [] as getAllProjectItem[],
  loading: false,
  isOpenModal: false,
  current_page: 1,
  formValue: {} as projectFormVal,
};

// all project by paging
export const getAllProjectPaging = createAsyncThunk<
  getAllProjectPagingRes,
  PagePageSizeType
>("getAllPlanPaging", async ({ page, pageSize }) => {
  const response = await axios.get(
    baseUrl + `Project/GetListByTenant?Page=${page}&PageSize=${pageSize}`
  );
  return response.data as getAllProjectPagingRes;
});

// all project without paging
export const fetchAllProject = createAsyncThunk("allProject", async () => {
  const response = await axios.get(baseUrl + "Project/GetListNonPaging");
  return response.data;
});

//projectById
export const getProjectById = createAsyncThunk(
  "projectById",
  async (id: number) => {
    const response = await axios.get(baseUrl + `Project/${id}`);
    return response.data;
  }
);

//addProject
export const addProject = createAsyncThunk(
  "addProject",
  async (addProjectForm: addProjectFormType) => {
    const response = await axios.post(baseUrl + "Project/Add", addProjectForm);
    return response.data;
  }
);

//updateProject
export const updateProject = createAsyncThunk(
  "updateProject",
  async (updateProjectForm: updateProjectFormType) => {
    const response = await axios.put(
      baseUrl + "Project/update",
      updateProjectForm
    );
    return response.data;
  }
);

//deleteProject
export const deleteProject = createAsyncThunk(
  "deleteProject",
  async (key: number) => {
    const response = await axios.delete(baseUrl + `Project/delete?Key=${key}`);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "projectSlice",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal;
      state.formValue = {} as projectFormVal;
    },
  },
  extraReducers: (builder) => {
    //ALL PAGING PAGING
    builder.addCase(getAllProjectPaging.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProjectPaging.fulfilled, (state, action) => {
      state.loading = false;
      state.allProjectPaging = action.payload;
    });
    builder.addCase(getAllProjectPaging.rejected, (state) => {
      state.loading = false;
    });

    // ALL PROJECT WITHOUT PAGING

    builder.addCase(fetchAllProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllProject.fulfilled, (state, action) => {
      state.loading = false;
      state.allProject = action.payload;
    });
    builder.addCase(fetchAllProject.rejected, (state) => {
      state.loading = false;
    });

    // BY ID
    builder.addCase(getProjectById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProjectById.fulfilled, (state, action) => {
      state.loading = false;
      state.formValue = action.payload;
      state.isOpenModal = true;
    });
    builder.addCase(getProjectById.rejected, (state) => {
      state.loading = false;
    });

    //ADD PROJECT

    builder.addCase(addProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProject.fulfilled, (state) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(addProject.rejected, (state) => {
      state.loading = false;
    });

    //  UPDATE PROJECT

    builder.addCase(updateProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProject.fulfilled, (state) => {
      state.loading = false;
      state.isOpenModal = false;
    });
    builder.addCase(updateProject.rejected, (state) => {
      state.loading = false;
    });

    // DELETE PROJECT
    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProject.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteProject.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default projectSlice.reducer;

export const { toggleModal } = projectSlice.actions;
