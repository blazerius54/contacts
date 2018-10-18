import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Name = styled.div`
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    color: #666;
    cursor: pointer;
  }
`;

/* eslint-disable react/prefer-stateless-function */
const ContactName = props => {
  const { contact, setActiveContact, index } = props;
  return (
    <Name onClick={() => setActiveContact(contact, index)}>
      <span>{contact.name}</span>
    </Name>
  );
};

export default ContactName;

ContactName.propTypes = {
  setActiveContact: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
