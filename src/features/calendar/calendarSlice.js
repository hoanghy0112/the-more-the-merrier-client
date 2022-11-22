/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startDate: new Date(),
  suggestionTime: [],
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSuggestionTime(state, action) {
      state.suggestionTime = action.payload;
    },
  },
  extraReducers() {},
});

export const selectStartDate = (state) => state.calendar.startDate;

export const { setSuggestionTime } = calendarSlice.actions;

export default calendarSlice.reducer;
