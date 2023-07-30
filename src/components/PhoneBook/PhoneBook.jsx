import React, { useState, useEffect } from 'react';
import Form from './Form/Form';
import ContactsList from './ContactsList/ContactsList';
import { Notification } from './Notification/Notification';
import { Filter } from './FilterByName/FilterByName';
import { Container } from './PhoneBook.styled';

function PhoneBook() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilter = event => {
    setFilter(event.currentTarget.value.trim());
  };

  const FilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const formSubmit = data => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts! `);
      return;
    }
    if (contacts.find(contact => contact.number === data.number)) {
      alert(`${data.number} is already in contacts! `);
      return;
    }
    setContacts([...contacts, data]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const FilerContacts = FilteredContacts();
  return (
    <Container>
      <Form onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} selected={handleFilter} />
      {contacts.length !== 0 ? (
        <ContactsList info={FilerContacts} deleteCont={deleteContact} />
      ) : (
        <Notification message="There is no any contacts" />
      )}
    </Container>
  );
}

export default PhoneBook;
