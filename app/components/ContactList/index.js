import React from 'react';
import styled from 'styled-components';

const ContactsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-right: 2px solid black;
`;

/* eslint-disable react/prefer-stateless-function */
export default class ContactList extends React.PureComponent {
  render() {
    return (
      <ContactsSection>
        <button onClick={() => console.log(this.props.contacts)}>
          show props
        </button>
        {this.props.contacts.map(contact => (
          <div key={contact.email}>{contact.name}</div>
        ))}
      </ContactsSection>
    );
  }
}
