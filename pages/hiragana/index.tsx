import Head from 'next/head';
import * as React from 'react';
import Layout from "../components/Layout";
import {getHiraganaData, IGetHiraganaDataResult} from "../../lib/hiragana";
import Quiz, {IQuizProps} from "./Quiz";
import LevelSelect from "./LevelSelect";


export async function getStaticProps(): Promise<{ props: IGetHiraganaDataResult }> {
  const props = getHiraganaData()
  return {
    props
  }
}

const index: React.FC<IQuizProps> = (props) => <Layout>
  <Head>
    <title>Hiragana</title>
  </Head>
  <LevelSelect {...props}/>
</Layout>

export default index;
