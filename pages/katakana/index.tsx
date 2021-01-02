import Head from 'next/head';
import * as React from 'react';
import Layout from "../components/Layout";
import {IGetHiraganaDataResult} from "../../lib/loadLang";
import LevelSelect from "../hiragana/LevelSelect";
import {getKatakanaData} from "../../lib/katakana";


export async function getStaticProps(): Promise<{ props: IGetHiraganaDataResult }> {
  const props = getKatakanaData()
  return {
    props
  }
}

const index: React.FC<IGetHiraganaDataResult> = (props) => <Layout>
  <Head>
    <title>Katakana</title>
  </Head>
  <LevelSelect {...props}/>
</Layout>

export default index;
