import { createSelector } from '@reduxjs/toolkit';

export const getStateItems = state => state.contacts.items;
export const getStateFilter = state => state.contacts.filter;
export const getStateLoading = state => state.contacts.isLoading;
export const getStateEdit = state => state.contacts.edit;

export const contactsAfterFilter = createSelector(
  [getStateItems, getStateFilter],
  (items, filter) => {
    const newItems = items.filter(item =>
      item.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
    return newItems;
  }
);
