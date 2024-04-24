import { FunctionComponent, useState, useCallback, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import clsx from 'clsx';

import styles from './User.module.scss';

const User: FunctionComponent = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const disabledAnimation = useRef<boolean>(true);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
    disabledAnimation.current = false;
  }, []);

  const handleLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.user}`)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.user}>
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
        <ul className={styles.user__dropdown}>
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
  );
};

export default User;
