import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('HomePage', initialState);

const makeSelectLoading = () =>
  createSelector(selectHome, homeState => homeState.isLoading);

const makeSelectContacts = () =>
  createSelector(selectHome, homeState => homeState.contacts);

export { selectHome, makeSelectLoading, makeSelectContacts };
