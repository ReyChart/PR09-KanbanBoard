import { FunctionComponent, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import User from '../../UI/User/User';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLinkHomeClick = useCallback(() => {
    if (pathname !== 'PR09-KanbanBoard/') {
      navigate('/PR09-KanbanBoard/');
    }
  }, [pathname, navigate]);

  return (
    <header className={styles.header}>
      <div className="container">
        <h1 onClick={handleLinkHomeClick} className={styles.header__logo}>
          Awesome Kanban Board
        </h1>
        <User />
      </div>
    </header>
  );
};

export default Header;
