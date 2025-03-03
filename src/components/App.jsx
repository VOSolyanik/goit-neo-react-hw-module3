import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import defaultContacts from "../data/contacts.json";

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import css from './App.module.css';

const CONTACTS_KEY = 'contacts';


function App() {
  const [contacts, setContacts] = useState(() => {
    const initialContacts = localStorage.getItem(CONTACTS_KEY);
    if (initialContacts) return JSON.parse(initialContacts);
    return defaultContacts;
  });

  const [filter, setFilter] = useState('');

  const filteredContacts = contacts.filter((contact) => {
    if(!filter.trim()) return contacts;

    return contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  });

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Add a new contact
  const handleAddContact = (values) => {
    setContacts((prevState) => [...prevState, {
      id: nanoid(),
      ...values
    }]);
  };

  // Delete a contact
  const handleDeleteContact = (contactId) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== contactId)
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.heading}>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
}

export default App;
