import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Button.module.css'
import Form from "./Form";
import React, {useState} from "react";
import {useTheme} from 'next-themes'
import {number, string} from "prop-types";
import {nanoid} from "nanoid";

export interface IDFParams {
    query: string,
    text1: string,
    text2: string,
    text3: string
}

export default function Home() {
    const {theme, setTheme} = useTheme()

    let wordFrequencies: { 0: { string?: number }, 1: { string?: number }, 2: { string?: number }, 3: { string?: number } } = {
        0: {},
        1: {},
        2: {},
        3: {}
    }
    let IDF = {}
    const allWords = {}

    const [frequencyTable, setFrequencyTable] = useState<React.ReactNode>(undefined)
    const [inverseDocumentFrequency, setInverseDocumentFrequency] = useState<React.ReactNode>(undefined)
    const [vectorGeneration, setVectorGeneration] = useState<React.ReactNode>(undefined)
    const [similarityCalculations, setSimilarityCalculations] = useState<React.ReactNode>(undefined)
    function calculateCosineSimilarity({query, text1, text2, text3}: IDFParams) {
        wordFrequencies = {0: {}, 1: {}, 2: {}, 3: {}}

        for (const word of query.split(' ')) {
            if (word) {
                // @ts-ignore
                wordFrequencies[0][word] = (wordFrequencies[1][word] ?? 0) + 1
            }
            // @ts-ignore
            allWords[word] = true
        }
        for (const word of text1.split(' ')) {
            if (word) {
                // @ts-ignore
                wordFrequencies[1][word] = (wordFrequencies[1][word] ?? 0) + 1
            }
            // @ts-ignore
            allWords[word] = true
        }
        for (const word of text2.split(' ')) {
            if (word) {
                // @ts-ignore
                wordFrequencies[2][word] = (wordFrequencies[2][word] ?? 0) + 1
            }
            // @ts-ignore
            allWords[word] = true
        }
        for (const word of text3.split(' ')) {
            if (word) {
                // @ts-ignore
                wordFrequencies[3][word] = (wordFrequencies[3][word] ?? 0) + 1
            }
            // @ts-ignore
            allWords[word] = true
        }
        let heading = []
        let doc1Row = []
        let doc2Row = []
        let doc3Row = []
        for (const word in allWords) {
            heading.push(<th>{word}</th>)
            // @ts-ignore
            doc1Row.push(<td>{wordFrequencies[1][word] ?? 0}</td>)
            // @ts-ignore
            doc2Row.push(<td>{wordFrequencies[2][word] ?? 0}</td>)
            // @ts-ignore
            doc3Row.push(<td>{wordFrequencies[3][word] ?? 0}</td>)
        }


        const frequencyTableHTML = <div>
            <h2 className="text-center text-3xl mb-4">Word Frequency</h2>
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
                {/*<tr>*/}
                {/*    <td>Query</td>*/}
                {/*    {queryRow}*/}
                {/*</tr>*/}
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
        setFrequencyTable(frequencyTableHTML)
        const IDFTable = []
        const wordTable = []
        // console.log(wordFrequencies)
        for (const word in allWords) {
            let count = 0
            for (let i = 1; i < 4; i++) {
                // @ts-ignore
                if (wordFrequencies[i][word] !== undefined) {
                    count++
                }
            }
            // @ts-ignore
            IDF[word] = Math.log10(3 / count)
            // @ts-ignore
            IDFTable.push(<td>{Number(IDF[word]).toFixed(3)}</td>)
            wordTable.push(<td>{word}</td>)
        }

        const inverseDocumentFrequencyHTML = <div>
            <h2 className="text-center text-3xl mb-4">Inverse Document Frequency</h2>
            <table style={{borderWidth: 4}} className="table-auto mx-auto">
                <tr>
                    <th>
                        Word
                    </th>
                    {wordTable}
                </tr>
                <tr>
                    <th>
                        IDF
                    </th>
                    {IDFTable}
                </tr>
            </table>
        </div>
        setInverseDocumentFrequency(inverseDocumentFrequencyHTML)

        const vectorTable: number[][] = [[], [], [], []]
        for (const wordTableKey in wordTable) {
            // vectorTable[0][]
        }
        for (const word in allWords) {
            // @ts-ignore
            vectorTable[0].push(IDF[word] * (wordFrequencies[0][word] ?? 0))
            // @ts-ignore
            vectorTable[1].push(IDF[word] * (wordFrequencies[1][word] ?? 0))
            // @ts-ignore
            vectorTable[2].push(IDF[word] * (wordFrequencies[2][word] ?? 0))
            // @ts-ignore
            vectorTable[3].push(IDF[word] * (wordFrequencies[3][word] ?? 0))
        }
        console.log(vectorTable)

        const vectorGenerationHTML = <div>
            <h2 className="text-center text-3xl mb-4">Document Vectors</h2>
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
                    {vectorTable[0].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}
                </tr>
                <tr>
                    <td>Document 1</td>
                    {vectorTable[1].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}
                </tr>
                <tr>
                    <td>Document 2</td>
                    {vectorTable[2].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}

                </tr>
                <tr>
                    <td>Document 3</td>
                    {vectorTable[3].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}
                </tr>
                </tbody>
            </table>
        </div>
        setVectorGeneration(vectorGenerationHTML)
        let sc1 = 0
        let sc2 = 0
        let sc3 = 0
        let sc1Calc = []
        let sc2Calc = []
        let sc3Calc = []
        let i = 0
        for (const word in allWords) {
            if (vectorTable[0][i] && vectorTable[1][i]) {
                sc1 += vectorTable[0][i] * vectorTable[1][i]
                sc1Calc.push(<p>{vectorTable[0][i].toFixed(3)} × {vectorTable[1][i].toFixed(3)} ({word}) +</p>)
            }
            if (vectorTable[0][i] && vectorTable[2][i]) {
                sc2 += vectorTable[0][i] * vectorTable[2][i]
                sc2Calc.push(<p>{vectorTable[0][i].toFixed(3)} × {vectorTable[2][i].toFixed(3)} ({word}) +</p>)
            }
            if (vectorTable[0][i] && vectorTable[3][i]) {
                sc3 += vectorTable[0][i] * vectorTable[3][i]
                sc3Calc.push(<span>{vectorTable[0][i].toFixed(3)} × {vectorTable[3][i].toFixed(3)} ({word}) +</span>)
            }
            i++
        }

        const similarityCalculationHTML = <div>
            {sc1Calc} = {sc1}
            <div/>
            {sc2Calc} = {sc2}
            <div/>
            {sc3Calc} = {sc3}
        </div>
        setSimilarityCalculations(similarityCalculationHTML)
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
            >Dark Mode
            </button>
            <Form onSubmit={calculateCosineSimilarity}/>
            {frequencyTable}
            <div className="m-2"/>
            {inverseDocumentFrequency}
            <div className="m-2"/>
            {vectorGeneration}
            <div className="m-2"/>
            {similarityCalculations}
            <footer className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white"
                       href="">
                        <span className="ml-3 text-xl">Project for Learning NextJS</span>
                    </a>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="ml-3 text-gray-400" target="_blank" rel="noreferrer">
                            <Image className="dark:text-gray-500" src="/github.svg" width={48} height={48}
                                   alt="Github Logo"/>
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    )
}
