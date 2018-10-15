import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: 2px solid black;
`;

/* eslint-disable react/prefer-stateless-function */
export default class ContactsSidebar extends React.PureComponent {
  render() {
    const { contacts, setActiveContact } = this.props;
    return (
      <ContactList>
        {contacts.map(contact => (
          <div onClick={() => setActiveContact(contact)} key={contact.email}>
            {contact.name}
          </div>
        ))}
      </ContactList>
    );
  }
}

ContactsSidebar.propTypes = {
  contacts: PropTypes.array,
  setActiveContact: PropTypes.func.isRequired,
};
