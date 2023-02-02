/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { createNewTaskAPI, deleteTaskAPI, updateTaskAPI } from './TasksAPI';

const initialState = {
  listTasks: [],
  status: 'idle',
  error: null,
};

export const createNewTask = createAsyncThunk(
  'tasksManagement/createNewTask',
  async (req) => {
    try {
      return await createNewTaskAPI(req);
    } catch (error) {
      console.log({ error });
      return {};
    }
  },
);

export const changeTask = createAsyncThunk(
  'tasksManagement/changeTask',
  async (req) => {
    try {
      return await updateTaskAPI(req);
    } catch (error) {
      console.log({ error });
      return {};
    }
  },
);
export const deleteTask = createAsyncThunk(
  'tasksManagement/deleteTask',
  async (req) => {
    try {
      return await deleteTaskAPI(req);
    } catch (error) {
      console.log({ error });
      return {};
    }
  },
);

export const tasksManagementSclice = createSlice({
  name: 'tasksManagement',
  initialState,
  reducers: {
    updateListTask: (state, action) => {
      state.listTasks = action.payload;
    },
    updateModifiedTask: (state, action) => {
      const newTask = action.payload;
      state.listTasks = [
        ...state.listTasks.filter((task) => task._id !== newTask._id),
        newTask,
      ];
    },
    updateAddedTask: (state, action) => {
      state.listTasks = [...state.listTasks, action.payload];
    },
    updateDeletedTask: (state, action) => {
      const taskID = action.payload;
      state.listTasks = [
        ...state.listTasks.filter((task) => task._id !== taskID),
      ];
    },
  },
  extraReducers(builder) {
    builder
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

export const {
  updateListTask,
  updateAddedTask,
  updateModifiedTask,
  updateDeletedTask,
} = tasksManagementSclice.actions;

export const selectAllTasks = (state) => state.tasksManagement.listTasks;
export const selectCurrentWeekTasks = (startDate) => (state) => {
  const tasks = state.tasksManagement.listTasks.filter((task) => {
    const diff = moment(new Date(task.time.from)).diff(
      new Date(startDate),
      'd',
    );
    return diff >= 0 && diff < 7;
  });
  return tasks;
};

export const selectTasksStatus = (state) => state.tasksManagement.status;

export const selectTasksError = (state) => state.tasksManagement.error;

export default tasksManagementSclice.reducer;
