import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactFrom/contactForm.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
  };

  addContact = evt => {
    evt.preventDefaul();
  };

  onChange = () => {};

  render() {
    const { contacts } = this.state;
    const { addContact } = this;

    const contact = contacts.map(({ id, name, number }) => (
      <li key={id} className={styles.list_item}>
        {name}: <span >{number}</span>
        <button className={styles.contacts_btn}>Delete</button>
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
                onChange={() => {}}
                className={styles.contact_input}
                type="text"
                placeholder="Enter name"
                name="name"
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
                onChange={() => {}}
                className={styles.contact_input}
                type="tel"
                placeholder="Enter phone number"
                name="number"
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
