import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactName from '../ContactName';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  h3 {
    margin: 10px 10px 0 10px;
  }

  input {
    padding-left: 10px;
    line-height: 30px;
    font-size: 110%;

    &:focus {
      outline: none;
    }
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 30%; */
  min-height: 100vh;
  border-right: 2px solid black;
  border-top: 2px solid black;
`;

/* eslint-disable react/prefer-stateless-function */
export default class ContactsSidebar extends React.PureComponent {
  render() {
    const { contacts, setActiveContact, setSearchedContact } = this.props;
    return (
      <SidebarWrapper>
        <header>
          <h3>Your contacts:</h3>
          <input onChange={e => setSearchedContact(e.target.value)} placeholder='Search...'/>
        </header>
        <ContactList>
          {contacts.map(contact => (
            <ContactName
              contact={contact}
              setActiveContact={setActiveContact}
              key={contact.email}
            />
          ))}
        </ContactList>
      </SidebarWrapper>
    );
  }
}

ContactsSidebar.propTypes = {
  setActiveContact: PropTypes.func.isRequired,
  setSearchedContact: PropTypes.func.isRequired,
  contacts: PropTypes.array,
};
