import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
  }, []);

  const handleLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.header__user}`)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
                <a onClick={handleLinkClick} href="#">
                  Profile
                </a>
              </li>
              <li>
                <a onClick={handleLinkClick} href="#">
                  Log Out
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
