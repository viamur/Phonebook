import { Outlet } from 'react-router-dom';
import Container from '../Container/Container';
import UserMenu from '../UserMenu/UserMenu';
import FirstBox from '../FirstBox/FirstBox';
import SecondBox from '../SecondBox/SecondBox';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import { useSelector } from 'react-redux';
import { getStateToken } from 'redux/user/userSelector';
import s from './SharedLayout.module.css';

const SharedLayout = ({ children }) => {
  const isAuth = useSelector(getStateToken);
  return (
    <Container>
      <FirstBox>
        <h1 className={s.title}>PHONEBOOK</h1>
        {isAuth ? (
          <>
            <ContactForm />
            <Filter />
          </>
        ) : (
          <h1>Hello</h1>
        )}
      </FirstBox>

      <UserMenu />

      <SecondBox>{children}</SecondBox>
    </Container>
  );
};

export default SharedLayout;