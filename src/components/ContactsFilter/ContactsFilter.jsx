import PropTypes from 'prop-types';
import styles from "../ContactForm/contactForm.module.css"

const ContactFilter = ({onInputChange}) => {

    return (
        <label className={styles.contacts_label}>
            Find contacts:
            <input
              onChange={onInputChange}
              name="filter"
              className={styles.contacts_input}
              type="text"
              placeholder="Enter contact name or phone number"
            />
          </label>
    )
}

export default ContactFilter;

ContactFilter.propTypes = {
    onInputChange: PropTypes.func.isRequired,
  };