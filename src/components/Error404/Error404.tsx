import { FunctionComponent } from 'react';
import Layout from '../Layout/Layout';

import styles from './Error404.module.scss';

const Error404: FunctionComponent = () => {
  return (
    <Layout>
      <main>
        <div className="container">
          <div className={styles.error404}>Error 404</div>
        </div>
      </main>
    </Layout>
  );
};

export default Error404;
