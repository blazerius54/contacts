import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.get('HomePage', initialState);

const makeSelectLoading = () =>
  createSelector(selectHome, homeState => homeState['isLoading']);

export { selectHome, makeSelectLoading };
