import { Component } from 'react';

import styles from './contactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    const { onSubmit } = this.props;
    onSubmit({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    const { onInputChange, onFormSubmit } = this;

    return (
      <form className={styles.form} onSubmit={onFormSubmit}>
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
    );
  }
}

export default ContactForm;
