import React from 'react';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ContactsSidebar from '../../components/ContactsSidebar';
import ActiveContact from '../ActiveContact';
import { makeSelectLoading, makeSelectContacts } from './slectors';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { requestContacts } from './actions';
import saga from './saga';

const Wrapper = styled.div`
  display: flex;
`;

const Center = styled.div`
  margin: 300px auto;
  font-weight: 600;
  font-size: 120%;
  color: #888;
`;

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      activeContact: null,
      index: null,
      serchedName: '',
      isAlphabeticalOrder: false,
      isContactEditing: false,
    };
    // this.state.contacts = this.props.contacts.length === 0 ? [] : this.props.contacts;
  }

  componentDidMount() {
    let contacts = localStorage.getItem('contacts');
    contacts = JSON.parse(contacts);
    if (contacts !== null && contacts.length > 0) {
      this.parseContacts();
    } else {
      this.props.requestContacts();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.contacts && newProps.contacts.length > 0) {
      this.setContacts(newProps.contacts);
    }
  }

  setContacts = contacts => {
    this.setState({
      contacts,
    });
  };

  parseContacts = () => {
    let contacts = localStorage.getItem('contacts');
    contacts = JSON.parse(contacts);
    this.setState({
      contacts,
    });
  };

  setActiveContact = (activeContact, index) => {
    if(this.state.isContactEditing) {
      return
    };
    this.setState({
      activeContact,
      index,
    });
    window.scrollTo(0, 0);
  };

  setSearchedContact = serchedName => {
    this.setState({
      serchedName,
    });
  };

  setAlphabeticalOrder = () => {
    this.setState({
      isAlphabeticalOrder: !this.state.isAlphabeticalOrder,
    });
  };

  editContact = (name, email, phone, website) => {
    let newContacts = this.state.contacts;
    let newContact = this.state.contacts[this.state.index];
    newContact = {
      ...newContact,
      name,
      email,
      phone,
      website,
    };
    newContacts = [
      ...newContacts.slice(0, this.state.index),
      newContact,
      ...newContacts.slice(this.state.index + 1),
    ];
    this.setState({
      activeContact: newContact,
      contacts: newContacts,
    });
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  setContactEditing = () => {
    this.setState({
      isContactEditing: !this.state.isContactEditing,
    });
  };

  render() {
    const {
      contacts,
      activeContact,
      serchedName,
      isAlphabeticalOrder,
      isContactEditing,
    } = this.state;
    const { isLoading } = this.props;

    return (
      <Wrapper>
        <ContactsSidebar
          isAlphabeticalOrder={isAlphabeticalOrder}
          setAlphabeticalOrder={this.setAlphabeticalOrder}
          contacts={contacts.filter(
            contact =>
              contact.name.toLowerCase().indexOf(serchedName.toLowerCase()) !==
              -1,
          )}
          setActiveContact={this.setActiveContact}
          setSearchedContact={this.setSearchedContact}
          isLoading={this.props.isLoading}
        />
        {activeContact && (
          <ActiveContact
            activeContact={activeContact}
            editContact={this.editContact}
            setContactEditing={this.setContactEditing}
            contacts={contacts}
            isContactEditing={isContactEditing}
          />
        )}
        {isLoading && <Center>loading...</Center>}
        {!isLoading && !activeContact && <Center>choose contact</Center>}
      </Wrapper>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  contacts: makeSelectContacts(),
});

const withConnect = connect(
  mapStateToProps,
  { requestContacts },
);

const withReducer = injectReducer({ key: 'HomePage', reducer });
const withSaga = injectSaga({ key: 'HomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
