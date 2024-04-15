import { FunctionComponent } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import styles from './Layout.module.scss';

const Layout: FunctionComponent = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Footer />
    </div>
  );
};

export default Layout;
