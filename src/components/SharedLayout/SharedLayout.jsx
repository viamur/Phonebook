import { useDispatch, useSelector } from 'react-redux';
import { Suspense, useEffect, lazy } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Container from '../Container/Container';
import FirstBox from '../FirstBox/FirstBox';
import SecondBox from '../SecondBox/SecondBox';
import { getStateToken } from 'redux/user/userSelector';
import s from './SharedLayout.module.css';
import Loader from 'components/Loader/Loader';
import { loginUserThunk } from 'redux/user/userOperations';

const BlockForContacts = lazy(() =>
  import('../BlockForContacts/BlockForContacts' /* webpackChunkName: 'BlockForContacts' */)
);

const demoAccount = { email: 'test@git.com', password: 'testadmin' };

const SharedLayout = () => {
  const isAuth = useSelector(getStateToken);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname === '/') {
      isAuth ? navigate('contacts') : navigate('login');
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <FirstBox>
        <h1 className={s.title}>PHONEBOOK</h1>
        {isAuth ? (
          <Suspense fallback={<Loader />}>
            <BlockForContacts />
          </Suspense>
        ) : (
          <>
            <p className={s.text}>
              Hello dear guest! 👋 Register and use our platform to save your phone ☎️ contacts.
            </p>
            <p className={s.textDemo}>You can use the ⬇️⬇️⬇️ </p>
            <button
              type="button"
              className={s.span}
              onClick={() => dispatch(loginUserThunk({ ...demoAccount }))}
            >
              demo version
            </button>
          </>
        )}
      </FirstBox>

      <SecondBox>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </SecondBox>
    </Container>
  );
};

export default SharedLayout;
