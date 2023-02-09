import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactFilter from './ContactsFilter/ContactsFilter';
import ContactList from './ContactList/ContactList';

import styles from './ContactForm/contactForm.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  addContact = evt => {
    evt.preventDefault();
    const { name, number, contacts } = this.state;

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

      return { contacts: [newContact, ...contacts], name: '', number: '' };
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

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
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
    const { name, number } = this.state;
    const { addContact, onInputChange, deleteContact } = this;
    const contacts = this.getFilteredContacts();

    return (
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={addContact}>
          <div className={styles.phonebook}>
            <h2 className={styles.title}>Phonebook</h2>

            <div className={styles.input_wrepper}>
              <label className={styles.contact_label} htmlFor="name">
                Name:
              </label>
              <input
                id="name"
                onChange={onInputChange}
                className={styles.contact_input}
                type="text"
                placeholder="Enter name"
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </div>

            <div className={styles.input_wrepper}>
              <label className={styles.contact_label} htmlFor="number">
                Tel.:
              </label>
              <input
                id="number"
                onChange={onInputChange}
                className={styles.contact_input}
                type="tel"
                placeholder="Enter phone number"
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </div>
            <button className={styles.phonebook_btn}> Add contact </button>
          </div>
        </form>

        <div className={styles.contacts}>
          <h2 className={styles.title}>Contacts:</h2>
          <ContactFilter onInputChange={onInputChange}/>
          <ContactList contacts={contacts} deleteContact={deleteContact} />
        </div>
      </div>
    );
  }
}
