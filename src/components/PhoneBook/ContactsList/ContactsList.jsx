import React from 'react';
import PropTypes from 'prop-types';
import { ListOfPpl, DeleteButt } from './ContatsList.styled';

function ContactsList({ info, deleteCont }) {
  return (
    <div>
      <ul>
        {info.map(contact => {
          return (
            <ListOfPpl key={contact.id}>
              <p>
                {contact.name}: {contact.number}
              </p>
              <DeleteButt type="button" onClick={() => deleteCont(contact.id)}>
                Delete
              </DeleteButt>
            </ListOfPpl>
          );
        })}
      </ul>
    </div>
  );
}

ContactsList.propTypes = {
  info: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteCont: PropTypes.func.isRequired,
};

export default ContactsList;
