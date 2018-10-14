import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ActiveContactSection = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: flex-start;
`;

const ActiveContactWrapper = styled.div`
  display: flex;

  img {
    align-self: center;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export default class ActiveContact extends React.PureComponent {
  render() {
    const { activeContact } = this.props;
    return (
      <ActiveContactSection>
        <ActiveContactWrapper>
          <img src={activeContact.avatar} alt='avatar' />
          <p>{activeContact && activeContact.name}</p>
        </ActiveContactWrapper>        
      </ActiveContactSection>
    );
  }
}

ActiveContact.propTypes = {
  activeContact: PropTypes.object,
};
