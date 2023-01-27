import { Component } from 'react';
import { nanoid } from 'nanoid';

import Form from './Form/Form';
import ContactList from './Contacts/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('my-contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      console.log('Update items');
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizedFind = name.toLowerCase();
    const { contacts } = this.state;

    if (
      contacts.find(contact => contact.name.toLowerCase() === normalizedFind)
    ) {
      return alert(`This contact is already in your book.`);
    }

    if (contacts.find(contact => contact.number === number)) {
      return alert(`This number is already in your book.`);
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filtered;
  };

  render() {
    // const { contacts } = this.state;
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();
    return (
      <div
        style={{
          height: '100vh',
          marginLeft: 30,
          fontSize: 20,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />

        <h1>Contacts</h1>
        <Filter filter={filter} onChange={this.handleFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
