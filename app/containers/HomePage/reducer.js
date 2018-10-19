import { CONTATACT_REQUEST, CONTATACT_REQUEST_SUCCESS } from './consts';

export const initialState = {
  isLoading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CONTATACT_REQUEST:
      console.log('asdf')
      return {
        isLoading: true,
      };
    case CONTATACT_REQUEST_SUCCESS:
      return {
        isLoading: false,
      };
    default:
      return state;
  }
}
