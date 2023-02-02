import { useState } from 'react'
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'
import css from './ContactForm.module.css';

export const ContactForm = ({onFormSubmit}) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameInputId = nanoid();
  const phoneNumberInputID = nanoid();

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      
      case 'number':
        setNumber(value);
        break;
      
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    onFormSubmit({id: nanoid(), name, number,});
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label} htmlFor={nameInputId}>
          Name
          <input
            className={css.input}
            type="text"
            name="name"
            value={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            id={nameInputId}
            onChange={handleChange}
          />
        </label>

        <label className={css.label} htmlFor={phoneNumberInputID}>
          Number
          <input
            className={css.input}
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            id={phoneNumberInputID}
            onChange={handleChange}
          />
        </label>

        <button className={css.button} type="submit">Add contact</button>
      </form>
    );
}

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};