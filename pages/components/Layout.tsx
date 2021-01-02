import * as React from 'react';
import styles from '../../styles/Layout.module.css'
import Link from "next/link";

interface IProps {

}

const Layout: React.FC<IProps> = ({children}) =>
  <div className={styles.container}>
    <div className={styles.back}>
      <Link href="/">
        <a>{'<'} Home</a>
      </Link>
    </div>
    {children}
  </div>

export default Layout;
