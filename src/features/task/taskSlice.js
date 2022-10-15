import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: '',
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
});

export const selectTasks = (state) => state.task.tasks;

export default taskSlice.reducer;
