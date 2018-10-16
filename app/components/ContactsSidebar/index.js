import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactName from '../ContactName';
const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-height: 100vh;
  border-right: 2px solid black;
`;

/* eslint-disable react/prefer-stateless-function */
export default class ContactsSidebar extends React.PureComponent {
  render() {
    const { contacts, setActiveContact, setSearchedContact } = this.props;
    return (
      <ContactList>
        <input onChange={e => setSearchedContact(e.target.value)} />
        {contacts.map(contact => {
          // <div onClick={() => setActiveContact(contact)} key={contact.email}>
          //   {contact.name}
          // </div>
          return <ContactName contact={contact.name} setActiveContact={setActiveContact} key={contact.email}/>
        })}
      </ContactList>
    );
  }
}

ContactsSidebar.propTypes = {
  setActiveContact: PropTypes.func.isRequired,
  setSearchedContact: PropTypes.func.isRequired,
  contacts: PropTypes.array,
};
