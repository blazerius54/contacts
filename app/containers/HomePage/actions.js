import { CONTATACT_REQUEST, CONTATACT_REQUEST_SUCCESS } from './consts';

export const requestContacts = () => ({
  type: CONTATACT_REQUEST,
});

export const requestContactsSuccess = contacts => ({
  type: CONTATACT_REQUEST_SUCCESS,
  contacts,
});
