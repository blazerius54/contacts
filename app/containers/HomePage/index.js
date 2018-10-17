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
`;

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      activeContact: null,
      serchedName: '',
      isAlphabeticalOrder: false,
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

  setAlphabeticalOrder = () => {
    this.setState({
      isAlphabeticalOrder: !this.state.isAlphabeticalOrder,
    });
  };

  render() {
    const {
      contacts,
      activeContact,
      serchedName,
      isAlphabeticalOrder,
    } = this.state;
    return (
      <Wrapper>
        <button onClick={() => this.setAlphabeticalOrder()}>click</button>
        <ContactsSidebar
          contacts={contacts
            .sort((a, b) => {
              if (!isAlphabeticalOrder) {
                return;
              }

              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
            })
            .filter(
              contact =>
                contact.name
                  .toLowerCase()
                  .indexOf(serchedName.toLowerCase()) !== -1,
            )}
          setActiveContact={this.setActiveContact}
          setSearchedContact={this.setSearchedContact}
        />
        {activeContact && <ActiveContact activeContact={activeContact} />}
      </Wrapper>
    );
  }
}
