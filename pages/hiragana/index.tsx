import Head from 'next/head';
import * as React from 'react';
import Link from "next/link";
import Layout from "../components/Layout";
import {getHiraganaData} from "../../lib/hiragana";
import Quiz, {IQuizProps} from "./Quiz";


export async function getStaticProps(): Promise<{ props: IQuizProps }> {
  const props = getHiraganaData()
  return {
    props
  }
}

const index: React.FC<IQuizProps> = (props) => <Layout>
  <Head>
    <title>Hiragana</title>
  </Head>
  <div>
    <Link href="/">
      <a>Back to home</a>
    </Link>
  </div>
  <Quiz {...props}/>
</Layout>

export default index;
