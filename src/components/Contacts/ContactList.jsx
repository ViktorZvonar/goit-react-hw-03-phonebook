// import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(contact => (
        <li
          className={css.item}
          key={contact.id}
          name={contact.name}
          number={contact.number}
        >
          <p className={css.name}>
            {contact.name}: <span>{contact.number}</span>
          </p>
          <button
            className={css.btn}
            onClick={() => onDeleteContact(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
