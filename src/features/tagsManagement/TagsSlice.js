/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { auth } from '../../firebase/signInWithGoogleAPI';
import { createNewTagAPI } from './tagAPI';

const initialState = {
  listTags: [],
  status: 'idle',
  createStatus: 'idle',
  error: null,
};

export const createNewTag = createAsyncThunk(
  'tagsManagement/createNewTag',
  async (newTag) => {
    const data = await createNewTagAPI(newTag);
    return data;
  },
);

export const findTagByTitle = createAsyncThunk(
  'tagsManagement/findTagByTitle',
  async (tagTitle) => {
    const res = await axios.get(`https://hoanghy.tech/api/v1/tag/${tagTitle}`);
    return res.data;
  },
);

export const findAllTagsOfUser = createAsyncThunk(
  'tagsManagement/findAllTagsOfUser',
  async () => {
    const accessToken = await auth.currentUser.getIdToken();
    const res = await axios.get('https://hoanghy.tech/api/v1/tag', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  },
);

export const tagsManagementSlice = createSlice({
  name: 'tagsManagement',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(createNewTag.pending, (state) => {
        state.createStatus = 'loading';
      })
      .addCase(createNewTag.fulfilled, (state) => {
        state.createStatus = 'succeeded';
      })
      .addCase(createNewTag.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(findTagByTitle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(findTagByTitle.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(findTagByTitle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(findAllTagsOfUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(findAllTagsOfUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listTags = action.payload;
      })
      .addCase(findAllTagsOfUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllTags = (state) => state.tagsManagement.listTags;

export const selectTagsStatus = (state) => state.tagsManagement.status;

export const selectTagsError = (state) => state.tagsManagement.error;

export default tagsManagementSlice.reducer;
