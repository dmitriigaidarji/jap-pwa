import * as React from 'react';
import styles from '../../styles/Layout.module.css'

interface IProps {

}

const Layout: React.FC<IProps> = ({children}) =>
  <div className={styles.container}>
    {children}
  </div>

export default Layout;
