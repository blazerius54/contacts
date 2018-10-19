import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ContactName from '../ContactName';
import azPicture from '../../images/az.png';

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 10%;
  min-width: 200px;

  h3 {
    margin: 10px 10px 0 10px;
  }

  input {
    padding-left: 10px;
    line-height: 30px;
    font-size: 110%;
    width: 80%;

    &:focus {
      outline: none;
    }
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  border-right: 2px solid black;
  border-top: 2px solid black;
`;

const HeaderRow = styled.div`
  display: flex;

  img {
    opacity: ${props => props.isButtonPressed && 0.2};
  }
`;

/* eslint-disable react/prefer-stateless-function */
export default class ContactsSidebar extends React.PureComponent {
  render() {
    const {
      contacts,
      setActiveContact,
      setSearchedContact,
      isAlphabeticalOrder,
      setAlphabeticalOrder,
    } = this.props;
    return (
      <SidebarWrapper>
        <header>
          <h3>Your contacts:</h3>
          <HeaderRow isButtonPressed={isAlphabeticalOrder}>
            <input
              onChange={e => setSearchedContact(e.target.value)}
              placeholder="Search..."
            />
            {/* <button onClick={() => setAlphabeticalOrder()}>
              <img src={azPicture} alt="a-z" />
            </button> */}
          </HeaderRow>
        </header>
        <ContactList>
          {contacts
          //   .sort((a, b) => {
          //   if (!isAlphabeticalOrder) {
          //     return;
          //   }

          //   if (a.name > b.name) {
          //     return 1;
          //   }
          //   if (a.name < b.name) {
          //     return -1;
          //   }
          // })
            .map((contact, index) => (
              <ContactName
                contact={contact}
                setActiveContact={setActiveContact}
                key={contact.email}
                index={index}
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
  setAlphabeticalOrder: PropTypes.func.isRequired,
  isAlphabeticalOrder: PropTypes.bool.isRequired,
  contacts: PropTypes.array,
};
