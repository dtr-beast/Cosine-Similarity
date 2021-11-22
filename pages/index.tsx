import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Button.module.css'
import Form from "./Form";
import React, {useState} from "react";
import {useTheme} from 'next-themes'

export interface IDFParams{
    query: string,
    text1: string,
    text2: string,
    text3: string
}
export default function Home() {
    const [frequencyTable, setFrequencyTable] = useState<React.ReactNode>(undefined)
    const {theme, setTheme} = useTheme()
    function calculateIDF({query, text1, text2, text3}: IDFParams) {
        const wordArray = query.split(' ')
        wordArray.push(...text1.split(' '))
        wordArray.push(...text2.split(' '))
        wordArray.push(...text3.split(' '))
        const wordSet = new Set<string>(wordArray)
        let heading = []
        let queryRow = []
        let doc1Row = []
        let doc2Row = []
        let doc3Row = []

        const iterator = wordSet.values()
        for (const word of iterator) {
            heading.push(<th>{word}</th>)
            let queryWordCount = 0
            for (const queryW of query.split(' ')) {
                if (queryW === word) {
                    queryWordCount++
                }
            }
            queryRow.push(<td>{queryWordCount}</td>)

            let doc1WordCount = 0
            for (const docW of text1.split(' ')) {
                if (docW === word) {
                    doc1WordCount++
                }
            }
            doc1Row.push(<td>{doc1WordCount}</td>)

            let doc2WordCount = 0
            for (const docW of text2.split(' ')) {
                if (docW === word) {
                    doc2WordCount++
                }
            }
            doc2Row.push(<td>{doc2WordCount}</td>)

            let doc3WordCount = 0
            for (const docW of text3.split(' ')) {
                if (docW === word) {
                    doc3WordCount++
                }
            }
            doc3Row.push(<td>{doc3WordCount}</td>)

        }

        const table = <div>
            <h2 className="text-center text-xl">Word Frequency</h2>
            <table style={{borderWidth: 4}} className="table-auto mx-auto">
                <thead>
                <tr>
                    <th>
                        Documents / Words
                    </th>
                    {heading}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Query</td>
                    {queryRow}
                </tr>
                <tr>
                    <td>Document 1</td>
                    {doc1Row}
                </tr>
                <tr>
                    <td>Document 2</td>
                    {doc2Row}
                </tr>
                <tr>
                    <td>Document 3</td>
                    {doc3Row}
                </tr>
                </tbody>
            </table>
        </div>

        setFrequencyTable(table)
    }

    return (
        <div className="dark:bg-gray-900">
            <Head>
                <title>Cosine Similarity Calculator</title>
                <meta name="description" content="Online Cosine Similarity Calculator"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className="text-center text-6xl mb-12 pt-12 dark:text-white">Cosine Similarity Calculator</h1>
            <button
                aria-label="Toggle Dark Mode"
                type="button"
                className={styles.button}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >Dark Mode</button>
            <Form onSubmit={calculateIDF}/>
            {/*{frequencyTable}*/}
            <h2 className="text-center text-3xl mb-4">Word Frequency</h2>

            <table className="table-auto mx-auto border-4 border-blue-600 border-opacity-100 dark:text-white">
                <thead>
                <tr className="dark:bg-green-800">
                    <th>Documents / Words</th>
                    <th>Femje</th>
                    <th>cuhames</th>
                    <th>fijrer.</th>
                    <th>Si</th>
                    <th>gaawupev</th>
                    <th>doj.</th>
                    <th>Dehomnev</th>
                    <th>wu</th>
                    <th>guhkun.</th>
                    <th>Zenke</th>
                    <th>ikiesu</th>
                    <th>niklevje</th>
                    <th>hezec</th>
                    <th>ujuwep.</th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-purple-400">
                    <td>Query</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>Document 1</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>Document 2</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <td>Document 3</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                </tbody>
            </table>
            <footer className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white"
                       href="">
                        <span className="ml-3 text-xl">Project for Learning NextJS</span>
                    </a>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="ml-3 text-gray-400" target="_blank" rel="noreferrer">
                            <Image className="dark:text-gray-500" src="/github.svg" width={48} height={48} alt="Github Logo"/>
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    )
}
