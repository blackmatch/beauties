import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import Girls from '../components/Girls';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <Girls />
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
