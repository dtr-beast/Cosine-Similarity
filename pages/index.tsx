import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Form from "./Form";

export default function Home() {
  return (
      // @ts-ignore
      <div className="bg-gray-900">
        <Head>
          <title>Cosine Similarity Calculator</title>
          <meta name="description" content="Generated by create next app"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
          <h1 className="text-center text-6xl my-12 dark:text-green-400">Cosine Similarity Calculator</h1>
        <Form/>

          <footer className="text-gray-400 bg-gray-900 body-font">
              <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                  <a className="flex title-font font-medium items-center md:justify-start justify-center text-white" href="">
                      <span className="ml-3 text-xl">Project for Learning NextJS</span>
                  </a>
                  <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

      <a className="ml-3 text-gray-400">
          <Image className="dark:text-gray-500" src="/github.svg" width={48} height={48} alt="Github Logo"/>
      </a>
    </span>
              </div>
          </footer>
        <footer className="text-center justify-center dark:text-white">
            <span className="m-3 items-center md:justify-start justify-center dark:text-gray-400">
            </span>
            <a href="https://github.com/dtr-beast" target="_blank" rel="noreferrer">
            </a>
        </footer>
      </div>
  )
}
