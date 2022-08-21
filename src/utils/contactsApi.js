import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const getContactsApi = async tokenUser => {
  token.set(tokenUser);
  const { data } = await axios.get('/contacts');
  return data;
};

export const addContactsApi = async contact => {
  const { data } = await axios.post('/contacts', contact);
  return data;
};

export const removeContactsApi = async id => {
  const { data } = await axios.delete(`/contacts/${id}`);
  return data;
};

export const editContactsApi = async (id, editData) => {
  const { data } = await axios.patch(`/contacts/${id}`, editData);
  return data;
};
