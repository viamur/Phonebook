import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getContactsApi,
  addContactsApi,
  removeContactsApi,
  editContactsApi,
} from '../../utils/contactsApi';

export const getContacts = createAsyncThunk('getContacts', async (_, thunkApi) => {
  const { token } = thunkApi.getState().user;
  try {
    const contacts = await getContactsApi(token);
    return contacts;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const addContacts = createAsyncThunk('addContacts', async (obj, thunkApi) => {
  try {
    const newContact = await addContactsApi(obj);
    return newContact;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const removeContacts = createAsyncThunk('removeContacts', async (id, thunkApi) => {
  try {
    await removeContactsApi(id);
    return id;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const editContacts = createAsyncThunk('editContacts', async ({ id, ...obj }, thunkApi) => {
  try {
    const editContact = await editContactsApi(id, obj);
    return editContact;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
