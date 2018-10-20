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
  width: 40%;
  box-shadow: 0px 5px 16px 3px rgba(0, 0, 0, 0.75);
  padding: 10px;

  img {
    align-self: center;
    border-radius: 100%;
    border: 2px solid silver;
    width: 130px;
    height: 130px;
  }

  button {
    background: #555;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
  }
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    flex-grow: 1;
    text-align: right;
    color: #666;

    &:focus {
      outline: none;
    }
  }
`;

/* eslint-disable react/prefer-stateless-function */
export default class ActiveContact extends React.PureComponent {
  constructor(props) {
    const { name, email, phone, website } = props.activeContact;
    super(props);
    this.state = {
      isEditing: false,
      name,
      email,
      phone,
      website,
    };
  }

  changeState = (prop, value) => {
    this.setState({
      [prop]: value,
    });
  };

  render() {
    const { avatar, name, email, phone, website } = this.props.activeContact;
    const { isEditing } = this.state;
    const { editContact } = this.props;
    return (
      <ActiveContactSection>
        <ActiveContactWrapper>
          <ContactRow>
            <img src={avatar} alt="avatar" />
            {isEditing ? (
              <input
                defaultValue={name}
                onChange={e => this.changeState('name', e.target.value)}
              />
            ) : (
              <p>{name}</p>
            )}
          </ContactRow>
          {isEditing ? (
            <div>
              <ContactRow>
                <p>Email:</p>
                <input
                  defaultValue={email}
                  onChange={e => this.changeState('email', e.target.value)}
                />
              </ContactRow>
              <ContactRow>
                <p>Phone:</p>
                <input
                  defaultValue={phone}
                  onChange={e => this.changeState('phone', e.target.value)}
                />
              </ContactRow>
              <ContactRow>
                <p>Website:</p>
                <input
                  defaultValue={website}
                  onChange={e => this.changeState('website', e.target.value)}
                />
              </ContactRow>
              <button
                onClick={() => {
                  editContact(
                    this.state.name,
                    this.state.email,
                    this.state.phone,
                    this.state.website,
                  );
                  this.setState({
                    isEditing: !isEditing,
                  });
                }}
              >
                save
              </button>
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
              <button
                onClick={() => {
                  this.setState({
                    isEditing: !isEditing,
                    name,
                    email,
                    phone,
                    website,
                  });
                }}
              >
                edit
              </button>
            </div>
          )}
        </ActiveContactWrapper>
      </ActiveContactSection>
    );
  }
}

ActiveContact.propTypes = {
  editContact: PropTypes.func.isRequired,
  activeContact: PropTypes.object,
};
