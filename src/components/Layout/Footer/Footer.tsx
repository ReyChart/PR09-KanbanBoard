import { FunctionComponent } from 'react';

import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div>
          <p>Active tasks: 0</p>
          <p>Finished tasks: 0</p>
        </div>
        <p>
          Kanban board by ReyChart, <span>{new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
