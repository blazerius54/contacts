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
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      name: this.props.activeContact.name,
    };
  }

  render() {
    const { avatar, name, email, phone, website } = this.props.activeContact;
    const { isEditing } = this.state;
    return (
      <ActiveContactSection>
        <ActiveContactWrapper>
          <ContactRow>
            <img src={avatar} alt="avatar" />
            <input
              defaultValue={name}
              onChange={e => this.setState({ name: e.target.value })}
            />
          </ContactRow>
          {isEditing ? (
            <div>
              <ContactRow>
                <p>Email:</p>
                <input defaultValue={email} />
              </ContactRow>
              <ContactRow>
                <p>Phone:</p>
                <input defaultValue={phone} />
              </ContactRow>
              <ContactRow>
                <p>Website:</p>
                <input defaultValue={website} />
              </ContactRow>
            </div>
          ) : (
            <div>
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
                <p>
                  <a href={website}>{website}</a>
                </p>
              </ContactRow>
            </div>
          )}
          <button
            onClick={() => {
              this.props.editContact(this.state.name)
              this.setState({
                isEditing: !isEditing,
              });
            }}
          >
            edit
          </button>
        </ActiveContactWrapper>
      </ActiveContactSection>
    );
  }
}

ActiveContact.propTypes = {
  activeContact: PropTypes.object,
};
