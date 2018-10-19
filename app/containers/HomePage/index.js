import React from 'react';
import styled from 'styled-components';
import ContactsSidebar from '../../components/ContactsSidebar';
import ActiveContact from '../ActiveContact';
import preparedFetch from '../../network/request';

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
      index: null,
      serchedName: '',
      isAlphabeticalOrder: false,
    };
  }

  componentDidMount() {
    let contacts = localStorage.getItem('contacts');
    contacts = JSON.parse(contacts);
    if (contacts !== null && contacts.length > 0) {
      this.parseContacts();
    } else {
      this.userRequest();
    }
  }

  parseContacts = () => {
    let contacts = localStorage.getItem('contacts');
    contacts = JSON.parse(contacts);
    this.setState({
      contacts,
    });
  };

  userRequest = () =>
    preparedFetch({
      method: 'GET',
    })
      .then(response => {
        if (response.status === 200) {
          return response;
        }
      })
      .then(data =>
        data.json().then(data => {
          localStorage.setItem('contacts', JSON.stringify(data));
          this.setState({ contacts: data });
        }),
      );

  setActiveContact = (activeContact, index) => {
    this.setState({
      activeContact,
      index,
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

  editContact = (name, email, phone, website) => {
    let newContacts = this.state.contacts;
    let newContact = this.state.contacts[this.state.index];
    newContact = {
      ...newContact,
      name,
      email,
      phone,
      website,
    };
    newContacts = [
      ...newContacts.slice(0, this.state.index),
      newContact,
      ...newContacts.slice(this.state.index + 1),
    ];
    this.setState({
      activeContact: newContact,
      contacts: newContacts,
    });
    localStorage.setItem('contacts', JSON.stringify(newContacts));
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
        <ContactsSidebar
          isAlphabeticalOrder={isAlphabeticalOrder}
          setAlphabeticalOrder={this.setAlphabeticalOrder}
          contacts={contacts.filter(
            contact =>
              contact.name.toLowerCase().indexOf(serchedName.toLowerCase()) !==
              -1,
          )}
          setActiveContact={this.setActiveContact}
          setSearchedContact={this.setSearchedContact}
        />
        {activeContact && (
          <ActiveContact
            activeContact={activeContact}
            editContact={this.editContact}
            contacts={contacts}
          />
        )}
      </Wrapper>
    );
  }
}
