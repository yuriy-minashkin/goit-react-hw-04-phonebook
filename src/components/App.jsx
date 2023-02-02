import { useState, useEffect } from 'react'
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem("contacts")) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = newContactObj => {
    const newName = newContactObj.name;

    contacts.some(
      contact => contact.name.toLowerCase() === newName.toLowerCase()
    )
      ? alert(`${newName} is already in contacts.`)
      : setContacts(prevState => [...prevState, newContactObj].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const updateFilterInput = (event) => {
    const { value } = event.target;
    setFilter(value)
  };
  
  const onFilter = () => {
    return filter.length > 0 ? contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    ) : contacts;
  }

  const removeContact = (id) => (
    setContacts(prevState => prevState.filter(contact => contact.id !== id))
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={addNewContact} />
      <h2>Contacts</h2>
      <Filter
        filter={filter}
        filterInput={updateFilterInput} />
      <ContactList
        contacts={onFilter()}
        contactDelHandler={removeContact} />
    </div>
  );
};

  