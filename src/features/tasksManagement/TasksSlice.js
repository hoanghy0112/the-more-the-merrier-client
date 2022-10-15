/* eslint-disable no-param-reassign */
import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  listTasks: [],
  status: 'idle',
  error: null,
};

export const getAllTasks = createAsyncThunk(
  'tasksManagement/getAllTasks',
  async (userID) => {
    const res = await axios.get(`https://hoanghy.tech/api/v1/task/${userID}`);
    return res;
  },
);

export const createNewTask = createAsyncThunk(
  'tasksManagement/createNewTask',
  async (userID, req) => {
    const { title, from, to, participants, tags, belongTo } = req;
    const res = await axios.post('https://hoanghy.tech/api/v1/task', {
      title,
      time: {
        from,
        to,
      },
      participants: participants || [],
      tags: tags || [],
      belongTo,
    });
    // const userTasks = await axios.get(
    //   `https://hoanghy.tech/api/v1/task/${userID}`,
    // );
    return res.data;
  },
);

export const changeTask = createAsyncThunk(
  'tasksManagement/changeTask',
  async (userID, taskID, req) => {
    const { fieldName, before, after } = req;
    const res = await axios.put(`https://hoanghy.tech/api/v1/task/${taskID}`, {
      [fieldName]: [before, after],
    });
    // const userTasks = await axios.get(
    //   `https://hoanghy.tech/api/v1/task/${userID}`,
    // );
    return res.data;
  },
);

export const tasksManagementSclice = createSlice({
  name: 'tasksManagement',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listTasks = action.payload;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createNewTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createNewTask.fulfilled, (state) => {
        state.status = 'succeeded';
        // state.listTasks = action.payload;
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(changeTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(changeTask.fulfilled, (state) => {
        state.status = 'succeeded';
        // state.listTasks = action.payload;
      })
      .addCase(changeTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllTasks = (state) => state.tasksManagement.listTasks;

export const selectTasksStatus = (state) => state.tasksManagement.status;

export const selectTasksError = (state) => state.tasksManagement.error;

export default tasksManagementSclice.reducer;
