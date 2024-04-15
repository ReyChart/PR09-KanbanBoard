import { FunctionComponent } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.header__logo}>Awesome Kanban Board</h1>
        <div className={styles.header__userimg}>
          <img src="./userAvatar.svg" alt="User avatar" />
          <IoIosArrowDown />
        </div>
      </div>
    </header>
  );
};

export default Header;
