import PropTypes from 'prop-types';
import styles from '../ContactForm/contactForm.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  const contact = contacts.map(({ id, name, number }) => (
    <li key={id} className={styles.list_item}>
      <p className={styles.item_text}>{name}: </p>
      <span>{number}</span>
      <button
        onClick={() => deleteContact(id)}
        className={styles.contacts_btn}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  return <ul className={styles.contacts_list}>{contact}</ul>;
};

export default ContactList;

ContactList.defaultProps = {
  contacts: [],
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
