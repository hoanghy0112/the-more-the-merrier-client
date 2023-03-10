/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  changeTaskOfGroupAPI,
  createNewGroupAPI,
  createTaskOfGroupAPI,
  deleteTaskOfGroupAPI,
  getTaskOfGroupAPI,
} from './groupAPI';

const initialState = {
  groups: [],
  groupTasks: [],
  currentGroupID: '',
  groupBusyTime: [],
  status: 'idle',
  fetchGroupBusyTimeStatus: 'idle',
  error: null,
};

export const createNewGroup = createAsyncThunk(
  'groupsManagement/createNewGroup',
  async (req) => {
    const { name, description, users, admin } = req;
    const response = await createNewGroupAPI({
      name,
      description,
      users,
      admin,
    });

    return response;
  },
);

export const createTaskOfGroup = createAsyncThunk(
  'groupsManagement/createTaskOfGroup',
  async (req) => {
    const {
      groupID,
      title,
      location,
      priority,
      time: { from, to },
      participants,
      descriptions,
    } = req;

    const response = await createTaskOfGroupAPI(
      groupID,
      title,
      location,
      priority,
      from,
      to,
      participants,
      descriptions,
    );

    return response;
  },
);

export const changeTaskOfGroup = createAsyncThunk(
  'groupsManagement/changeTaskOfGroup',
  async (req) => {
    const {
      data: { _id, ...otherFields },
    } = req;

    const response = await changeTaskOfGroupAPI(_id, otherFields);

    return response;
  },
);

export const deleteTaskOfGroup = createAsyncThunk(
  'groupsManagement/deleteTaskOfGroup',
  async (req) => {
    const {
      data: { _id },
    } = req;

    const response = await deleteTaskOfGroupAPI(_id);

    return response;
  },
);

export const getTaskOfGroup = createAsyncThunk(
  'groupsManagement/getTaskOfGroup',
  async (groupID) => {
    const response = await getTaskOfGroupAPI(groupID);

    return response;
  },
);

export const groupsManagementSlice = createSlice({
  name: 'groupsManagement',
  initialState,
  reducers: {
    setCurrentGroup: (state, action) => {
      state.currentGroupID = action.payload;
    },
    updateGroupInformation: (state, action) => {
      const groupInformation = action.payload;
      state.groups = [
        ...state.groups.filter(
          (group) => !group || group?._id !== groupInformation?._id,
        ),
        groupInformation,
      ];
    },
    updateListBusy: (state, action) => {
      state.groupBusyTime = action.payload;
      // const groupBusyTimes = action.payload;
      // const groupBusyTimeIDs = groupBusyTimes.map(({ _id }) => _id);
      // state.groupBusyTime = [
      //   ...state.groupBusyTime.filter(
      //     (task) => !groupBusyTimeIDs.includes(task._id),
      //   ),
      //   ...groupBusyTimes,
      // ];
    },
    updateModifiedBusy: (state, action) => {
      const busyTime = action.payload;
      state.groupBusyTime = [
        ...state.groupBusyTime.filter((task) => task._id !== busyTime._id),
        busyTime,
      ];
    },
    updateAddedBusy: (state, action) => {
      state.groupBusyTime = [...state.groupBusyTime, action.payload];
    },
    updateDeletedBusy: (state, action) => {
      const taskID = action.payload;
      state.groupBusyTime = [
        ...state.groupBusyTime.filter((task) => task._id !== taskID),
      ];
    },
    updateListGroupTask: (state, action) => {
      // state.groupTasks = action.payload;
      const groupTasks = action.payload;
      const groupTaskIDs = groupTasks.map(({ _id }) => _id);
      state.groupTasks = [
        ...state.groupTasks.filter((task) => !groupTaskIDs.includes(task._id)),
        ...groupTasks,
      ];
    },
    updateModifiedGroupTask: (state, action) => {
      const groupTask = action.payload;
      state.groupTasks = [
        ...state.groupTasks.filter((task) => task._id !== groupTask._id),
        groupTask,
      ];
    },
    updateDeletedGroupTask: (state, action) => {
      const taskID = action.payload;
      state.groupTasks = [
        ...state.groupTasks.filter((task) => task._id !== taskID),
      ];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createNewGroup.pending, (state, action) => {
        state.status = 'loading';

        const data = action.meta.arg;

        state.groups = [...state.groups, data];
      })
      .addCase(createNewGroup.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createNewGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTaskOfGroup.pending, (state, action) => {
        state.status = 'loading';

        const data = action.meta.arg;

        state.groupTasks = [...state.groupTasks, data];
      })
      .addCase(createTaskOfGroup.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(createTaskOfGroup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(changeTaskOfGroup.pending, (state, action) => {
        const { data } = action.meta.arg;

        state.groupTasks = [
          ...state.groupTasks.filter((task) => task._id !== data._id),
          {
            ...state.groupTasks.find((task) => task._id === data._id),
            ...data,
            _id: data._id,
          },
        ];
      })
      .addCase(deleteTaskOfGroup.pending, (state, action) => {
        const { data } = action.meta.arg;

        state.groupTasks = [
          ...state.groupTasks.filter((task) => task._id !== data._id),
        ];
      })
      .addCase(getTaskOfGroup.fulfilled, (state, action) => {
        state.groupTasks = action.payload;
      });
  },
});

export const {
  setCurrentGroup,
  updateGroupInformation,
  updateAddedBusy,
  updateDeletedBusy,
  updateListBusy,
  updateModifiedBusy,
  updateDeletedGroupTask,
  updateListGroupTask,
  updateModifiedGroupTask,
} = groupsManagementSlice.actions;

export const selectCurrentGroupID = (state) =>
  state.groupsManagement.currentGroupID;

export const selectAllGroups = (state) => state.groupsManagement.groups || [];

export const selectGroupByID = (groupID) => (state) =>
  selectAllGroups(state).find((group) => group._id === groupID);

export const selectCurrentGroupInfo = (state) =>
  selectAllGroups(state).find(
    (group) => group._id === state.groupsManagement.currentGroupID,
  ) || null;

export const selectGroupTaskOfCurrentGroup = (state) => {
  const { currentGroupID } = state.groupsManagement;
  return (state.groupsManagement.groupTasks || []).filter(
    (task) => task.belongTo === currentGroupID,
  );
};

export const selectGroupBusyTime = (state) =>
  state.groupsManagement.groupBusyTime || [];

export default groupsManagementSlice.reducer;
