import Head from 'next/head';
import * as React from 'react';
import Link from "next/link";

interface IProps {

}

const index: React.FC<IProps> = ({}) => <div>
  <Head>
    <title>Hiragana</title>
  </Head>
  hiragana
  <Link href="/">
    <a>Back to home</a>
  </Link>
</div>

export default index;
