import { FunctionComponent, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <h1 className={styles.header__logo}>Awesome Kanban Board</h1>
        <div className={styles.header__user}>
          <img src="./userAvatar.svg" alt="User avatar" />
          <button
            onClick={toggleDropdown}
            className={clsx(styles.btn__arrow, {
              [styles.arrow__rotate_first]: isDropdownOpen,
              [styles.arrow__rotate_second]: !isDropdownOpen && isDropdownOpen !== null,
            })}
          >
            <IoIosArrowDown />
          </button>
          {isDropdownOpen && (
            <ul className={styles.header__dropdown}>
              <li>
                <a href="#">Profile</a>
              </li>
              <li>
                <a href="#">Log Out</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
