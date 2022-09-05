import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Report } from 'notiflix/build/notiflix-report-aio';
import s from './ContactForm.module.css';
import { addContacts, editContacts } from 'redux/contacts/contactsOperations';
import { getStateEdit, getStateItems, getStateLoading } from 'redux/contacts/contactsSelector';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getStateItems);
  const isLoading = useSelector(getStateLoading);
  const editObj = useSelector(getStateEdit);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editObj) {
      setName(editObj.name);
      setNumber(editObj.number);
    }
  }, [editObj]);

  const handleChangeInput = e => {
    const input = e.target;

    input.name === 'name' && setName(input.value);
    input.name === 'number' && setNumber(input.value);
  };

  const handleFormCompilation = e => {
    e.preventDefault();
    if (editObj) {
      dispatch(editContacts({ ...editObj, name, number }));
      setName('');
      setNumber('');
      return;
    }
    const check = contacts.find(el => el.name.toLowerCase() === name.toLowerCase());
    if (!check) {
      dispatch(addContacts({ name, number }));
      setName('');
      setNumber('');
    } else {
      Report.failure('Error', name + 'is already in contacts', 'Okay');
    }
  };

  return (
    <>
      <form onSubmit={handleFormCompilation} className={s.form}>
        <label className={s.label}>
          <input
            type="text"
            name="name"
            className={s.input}
            placeholder="Name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChangeInput}
            maxLength={12}
          />
        </label>
        <label className={s.label}>
          <input
            type="tel"
            name="number"
            className={s.input}
            placeholder="Number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            maxLength={18}
            value={number}
            onChange={handleChangeInput}
          />
        </label>
        <button className={s.btn} type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : editObj ? 'Edit contact' : 'Add contact'}
        </button>
      </form>
    </>
  );
};

export default ContactForm;
