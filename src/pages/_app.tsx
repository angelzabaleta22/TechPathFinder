import { AppProps } from 'next/app';
import Head from 'next/head';
import {  MantineProvider, } from '@mantine/core';
import '../styles/global.css'
import '@mantine/core/styles.css';
import '@mantine/core/styles/global.css';


export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>TechPathFinder</title>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Plataforma web para la orientación de estudiantes y profesionales en tecnologías de la información." />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <MantineProvider >
        <Component {...pageProps} />
      </MantineProvider>
      

    </>
  );
}