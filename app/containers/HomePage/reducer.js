import { CONTATACT_REQUEST, CONTATACT_REQUEST_SUCCESS } from './consts';

export const initialState = {
  isLoading: false,
  contacts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONTATACT_REQUEST:
      return {
        isLoading: true,
      };
    case CONTATACT_REQUEST_SUCCESS:
      return {
        isLoading: false,
        contacts: action.contacts,
      };
    default:
      return state;
  }
}
