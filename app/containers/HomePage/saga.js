import { call, put, takeLatest, select, all } from 'redux-saga/effects';
import { CONTATACT_REQUEST } from './consts';
import contactRequest from '../../network/request';
import { requestContactsSuccess } from './actions';

function receiveContacts() {
  return contactRequest().then(data => data.json().then(data => data));
}

function* contactsFlow() {
  const contacts = yield call(() => receiveContacts());
  yield put(requestContactsSuccess(contacts));
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

export default function* labelListSaga() {
  yield all([yield takeLatest(CONTATACT_REQUEST, contactsFlow)]);
}
