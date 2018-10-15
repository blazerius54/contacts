import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ActiveContactSection = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: flex-start;
  margin-top: 150px;
`;

const ActiveContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  img {
    align-self: center;
  }
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

/* eslint-disable react/prefer-stateless-function */
export default class ActiveContact extends React.PureComponent {
  render() {
    const { avatar, name, email, phone, website } = this.props.activeContact;
    return (
      <ActiveContactSection>
        <ActiveContactWrapper>
          <ContactRow>
            <img src={avatar} alt='avatar' />
            <p>{this.props.activeContact && name}</p>
          </ContactRow>
          <ContactRow>
            <p>Email:</p>
            <p>{email}</p>
          </ContactRow>
          <ContactRow>
            <p>Phone:</p>
            <p>{phone}</p>
          </ContactRow>
          <ContactRow>
            <p>Website:</p>
            <p><a href={website}>{website}</a></p>
          </ContactRow>
        </ActiveContactWrapper>
      </ActiveContactSection>
    );
  }
}

ActiveContact.propTypes = {
  activeContact: PropTypes.object,
};
