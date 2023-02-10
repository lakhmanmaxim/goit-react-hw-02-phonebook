import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactFilter from './ContactsFilter/ContactsFilter';
import ContactList from './ContactList/ContactList';

import contactsArray from './contactsArray';

import styles from './ContactForm/contactForm.module.css';

export class App extends Component {
  state = {
    contacts: [...contactsArray],
    filter: '',
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (this.isDublicateContact(name, number)) {
      return alert(
        `The contact "${name}" or number "${number}" alredy exist your contact list. Please, check name or number of contact and try again`
      );
    }

    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return { contacts: [newContact, ...contacts] };
    });
  };

  isDublicateContact = (name, number) => {
    const normalizedName = name.toLowerCase();
    const phoneNumber = number;
    const { contacts } = this.state;
    const contact = contacts.find(({ name, number }) => {
      return name.toLowerCase() === normalizedName || number === phoneNumber;
    });
    return Boolean(contact);
  };

  deleteContact = id => {
    this.setState(({ contacts }) => {
      const newContact = contacts.filter(contact => contact.id !== id);
      return { contacts: newContact };
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) || number.includes(filter)
      );
    });
    return result;
  };

  render() {
    const { onInputChange, deleteContact, addContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div className={styles.wrapper}>
        <ContactForm onSubmit={addContact} />

        <div className={styles.contacts}>
          <h2 className={styles.title}>Contacts:</h2>
          <ContactFilter onInputChange={onInputChange} />
          <ContactList contacts={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    );
  }
}
