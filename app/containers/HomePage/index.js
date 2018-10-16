import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import ContactsSidebar from '../../components/ContactsSidebar';
import ActiveContact from '../ActiveContact';

function preparedFetch(opts, sessionToken) {
  const reqOpts = {
    method: opts.method,
    headers: {},
  };

  if (sessionToken) {
    reqOpts.headers.Authorization = `Bearer ${sessionToken}`;
  }

  if (
    opts.method === 'POST' ||
    opts.method === 'PUT' ||
    opts.method === 'PATCH' ||
    opts.method === 'DELETE'
  ) {
    reqOpts.headers.Accept = 'application/json';
    reqOpts.headers['Content-Type'] = 'application/json';
  }

  if (opts.body) {
    reqOpts.body = opts.body;

    if (
      opts.method === 'POST' ||
      opts.method === 'PUT' ||
      opts.method === 'PATCH' ||
      opts.method === 'DELETE'
    ) {
      reqOpts.body = JSON.stringify(opts.body);
    }
  }

  const url = `http://demo.sibers.com/users`;
  return fetch(url, reqOpts).then(response => {
    if (response.status === 401) {
      return;
    }
    return response;
  });
}

const Wrapper = styled.div`
  display: flex;

  input {
    height: 20px;
    border-bottom: 1px solid black;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      activeContact: null,
      serchedName: '',
    };
  }

  componentDidMount() {
    this.userRequest();
  }

  userRequest() {
    return preparedFetch({
      method: 'GET',
    })
      .then(response => {
        if (response.status === 200) {
          return response;
        }
      })
      .then(data =>
        data.json().then(data => this.setState({ contacts: data })),
      );
  }

  setActiveContact = activeContact => {
    this.setState({
      activeContact,
    });
  };

  setSearchedContact = serchedName => {
    this.setState({
      serchedName,
    });
  };

  render() {
    const { contacts, activeContact, serchedName } = this.state;
    return (
      <Wrapper>
        <ContactsSidebar
          contacts={contacts.filter(
            contact =>
              contact.name.toLowerCase().indexOf(serchedName.toLowerCase()) !==
              -1,
          )}
          setActiveContact={this.setActiveContact}
          setSearchedContact={this.setSearchedContact}
        />
        {activeContact && <ActiveContact activeContact={activeContact} />}
      </Wrapper>
    );
  }
}
