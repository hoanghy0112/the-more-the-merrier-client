/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAuth } from 'firebase/auth';

const initialState = {
  listTasks: [],
  status: 'idle',
  error: null,
};

export const getAllTasks = createAsyncThunk(
  'tasksManagement/getAllTasks',
  async () => {
    const auth = getAuth();
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
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const res = await axios.post(
      'https://hoanghy.tech/api/v1/task',
      {
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
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    try {
      const res = await axios.put(
        `https://hoanghy.tech/api/v1/task/${_id}`,
        { ...otherField },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // console.log({ res });
      return res.data;
    } catch (error) {
      // console.log({ error });
    }
    return {};
  },
);
export const deleteTask = createAsyncThunk(
  'tasksManagement/deleteTask',
  async ({ _id }) => {
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    try {
      const res = await axios.delete(
        `https://hoanghy.tech/api/v1/task/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // console.log({ res });
      return res.data;
    } catch (error) {
      // console.log({ error });
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

        const data = action.meta.arg;

        state.listTasks = [...state.listTasks, data];
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
      })
      .addCase(deleteTask.pending, (state, action) => {
        state.status = 'loading';
        const { _id } = action.meta.arg;
        state.listTasks = [
          ...state.listTasks.filter((task) => task._id !== _id),
        ];
      });
  },
});

export const { changeListTask } = tasksManagementSclice.actions;

export const selectAllTasks = (state) => state.tasksManagement.listTasks;
export const selectCurrentWeekTasks = (startDate) => (state) =>
  // console.log({ startDate });
  state.tasksManagement.listTasks.filter(
    (task) => {
      const diff =
        new Date(task.time.from).getDate() - new Date(startDate).getDate();
      // const diff = moment(new Date(task.time.from)).diff(
      //   new Date(
      //     startDate.getYear() + 1900,
      //     startDate.getMonth(),
      //     startDate.getDate(),
      //   ),
      //   'days',
      // );
      // console.log({ diff }, task.title, task.time.from);
      return diff >= 0 && diff < 7;
    },
    // new Date(task.time.from) >=
    //   new Date(parseInt(startDate.getTime() / 86400000, 10) * 86400000) &&
    // new Date(task.time.from) <=
    //   new Date(
    //     parseInt(startDate.getTime() / 86400000, 10) * 86400000 +
    //       7 * 24 * 60 * 60 * 1000,
    //   ),
  );

export const selectTasksStatus = (state) => state.tasksManagement.status;

export const selectTasksError = (state) => state.tasksManagement.error;

export default tasksManagementSclice.reducer;
