/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { createNewTagAPI, deleteTagByIDAPI } from './tagAPI';

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
    const auth = getAuth();
    const accessToken = await auth.currentUser.getIdToken();
    const res = await axios.get('https://hoanghy.tech/api/v1/tag', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  },
);

// export const deleteTagByID = createAsyncThunk()
export const deleteTagByID = createAsyncThunk(
  'tagsManagement/deleteTagByID',
  async (tag) => {
    const data = await deleteTagByIDAPI(tag);
    return data;
  },
);

export const tagsManagementSlice = createSlice({
  name: 'tagsManagement',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(createNewTag.pending, (state, action) => {
        state.createStatus = 'loading';

        const data = action.meta.arg;

        state.listTags = [...state.listTags, data];
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
      })
      .addCase(deleteTagByID.pending, (state, action) => {
        state.createStatus = 'loading';

        const data = action.meta.arg;

        // state.listTags = [...state.listTags, data];
        state.listTags = state.listTags.filter((tag) => tag._id !== data._id);
      });
  },
});

export const selectAllTags = (state) => state.tagsManagement.listTags;

export const selectTagsStatus = (state) => state.tagsManagement.status;
export const selectCreateStatus = (state) => state.tagsManagement.createStatus;

export const selectTagsError = (state) => state.tagsManagement.error;

export const selectTagsWithIDs = (tagIDs) => (state) =>
  state.tagsManagement.listTags.filter((tag) => tagIDs.indexOf(tag._id) !== -1);

export const selectTagsWithKeyword = (keyword) => (state) =>
  state.tagsManagement.listTags.filter((tag) => tag.title.includes(keyword));

export default tagsManagementSlice.reducer;
