import { FunctionComponent, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const disabledAnimation = useRef(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prevState) => !prevState);
    disabledAnimation.current = false;
  }, []);

  const handleLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setIsDropdownOpen(false);
  }, []);

  const handleLinkHomeClick = useCallback(() => {
    if (pathname !== '/') {
      navigate('/');
    }
  }, [pathname, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.header__user}`)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className="container">
        <h1 onClick={handleLinkHomeClick} className={styles.header__logo}>
          Awesome Kanban Board
        </h1>
        <div className={styles.header__user}>
          <img src="/userAvatar.svg" alt="User avatar" />
          <button
            onClick={toggleDropdown}
            className={clsx(styles.btn__arrow, {
              [styles.arrow__rotate_first]: isDropdownOpen,
              [styles.arrow__rotate_second]: !isDropdownOpen && !disabledAnimation.current,
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
