/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase/signInWithGoogleAPI';

const initialState = {
  listTasks: [],
  status: 'idle',
  error: null,
};

export const getAllTasks = createAsyncThunk(
  'tasksManagement/getAllTasks',
  async () => {
    const accessToken = await auth.currentUser.getIdToken();
    const res = await axios.get('https://hoanghy.tech/api/v1/task/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  },
);

export const createNewTask = createAsyncThunk(
  'tasksManagement/createNewTask',
  async (req) => {
    const accessToken = await auth.currentUser.getIdToken();
    // const { time } = req;
    const res = await axios.post(
      'https://hoanghy.tech/api/v1/task',
      {
        // time,
        ...req,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return res.data;
  },
);

export const changeTask = createAsyncThunk(
  'tasksManagement/changeTask',
  async ({ _id, ...otherField }) => {
    const accessToken = await auth.currentUser.getIdToken();
    try {
      const res = await axios.put(
        `https://www.hoanghy.tech/api/v1/task/${_id}`,
        { ...otherField },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log({ res });
      return res.data;
    } catch (error) {
      console.log({ error });
    }
    return {};
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
      .addCase(createNewTask.pending, (state, action) => {
        state.status = 'loading';
        // const data = action.meta.arg;
      })
      .addCase(createNewTask.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(changeTask.pending, (state, action) => {
        state.status = 'loading';
        const data = action.meta.arg;
        state.listTasks = [
          ...state.listTasks.filter((task) => task._id !== data._id),
          {
            ...state.listTasks.filter((task) => task._id === data._id)[0],
            ...data,
            _id: data._id,
          },
        ];
      })
      .addCase(changeTask.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(changeTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { changeListTask } = tasksManagementSclice.actions;

export const selectAllTasks = (state) => state.tasksManagement.listTasks;
export const selectCurrentWeekTasks = (startDate) => (state) =>
  state.tasksManagement.listTasks.filter(
    (task) =>
      new Date(task.time.from) >=
        new Date(parseInt(startDate.getTime() / 86400000, 10) * 86400000) &&
      new Date(task.time.from) <=
        new Date(
          parseInt(startDate.getTime() / 86400000, 10) * 86400000 +
            7 * 24 * 60 * 60 * 1000,
        ),
  );

export const selectTasksStatus = (state) => state.tasksManagement.status;

export const selectTasksError = (state) => state.tasksManagement.error;

export default tasksManagementSclice.reducer;
