import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactFrom/contactForm.module.css';

export class App extends Component {
  state = {
    contacts: [
      // { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      // { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    ],
    name: '',
    number: '',
  };

  addContact = (evt) => {
    evt.preventDefault();
    
    this.setState(prevState => {
      const { name, number, contacts} = prevState;
      if (this.isDublicateContact(name, number)) {
        return alert(`The contact "${name}" or number "${number}" alredy exist your contact list. Please, check name or number of contact and try again`)
      }
      const newContact = {
        id: nanoid(),
        name,
        number,
      }

      return {contacts: [newContact, ...contacts], name: "", number: ""}
    })
  };

  isDublicateContact = (name, number) => {
    const normalizedName = name.toLowerCase();
    const phoneNumber = number;
    const {contacts} = this.state;
    const contact = contacts.find(({name, number}) => {
      return (name.toLowerCase() === normalizedName || number === phoneNumber)
    })
    return Boolean(contact);
  }

  deleteContact = (id) => {
    this.setState(({contacts}) => {
      const newContact = contacts.filter(contact => contact.id !== id);
      return {contacts: newContact}
    })
  }

  onInputChange = ({target}) => {
    const {name, value } = target;
    this.setState({
      [name]: value,
    })
  };

  render() {
    const { contacts, name, number } = this.state;
    const { addContact, onInputChange, deleteContact } = this;

    const contact = contacts.map(({ id, name, number }) => (
      <li key={id} className={styles.list_item}>
        <p className={styles.item_text}>{name}: </p>
        <span >{number}</span>
        <button onClick={() => deleteContact(id)} className={styles.contacts_btn} type="button">Delete</button>
      </li>
    ));

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
          <h2 className={styles.title}>Contacts</h2>
          <ol className={styles.contacts_list}>{contact}</ol>
        </div>
      </div>
    );
  }
}
