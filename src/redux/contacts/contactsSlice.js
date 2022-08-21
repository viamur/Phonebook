import { createSlice } from '@reduxjs/toolkit';
import { getContacts, addContacts, removeContacts, editContacts } from './contactsOperations';

const contactsSlice = createSlice({
  name: 'items',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
    edit: null,
  },
  reducers: {
    changeFilter(state, { payload }) {
      return { ...state, filter: payload };
    },
    editContact(state, { payload }) {
      state.edit = payload;
    },
  },
  extraReducers: {
    [getContacts.pending]: (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    },
    [getContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [getContacts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
    },
    [addContacts.pending]: (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    },
    [addContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [addContacts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = [...state.items, payload];
    },
    [removeContacts.pending]: (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    },
    [removeContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [removeContacts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== payload);
    },
    [editContacts.pending]: (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    },
    [editContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [editContacts.fulfilled]: (state, { payload }) => {
      state.items = state.items.map(el => (el.id === payload.id ? payload : el));
      state.edit = null;
      state.isLoading = false;
    },
  },
});

export const { changeFilter, editContact } = contactsSlice.actions;
export default contactsSlice.reducer;
