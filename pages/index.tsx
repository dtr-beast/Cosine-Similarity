import Head from 'next/head'
import Form from "./Form";
import React, {useState} from "react";
import {useTheme} from 'next-themes'
import {nanoid} from "nanoid";
import styles from "../styles/Button.module.css"

export interface IDFParams {
    query: string,
    text1: string,
    text2: string,
    text3: string
}

function displayText(text: string) {
    // TODO: Add read more
    if (text.length > 50) {
        return `${text.substring(0, 47)}...`
    }
    return text
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

    function calculateCosineSimilarity(query: string, text1: string, text2: string, text3: string) {
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


        const frequencyTableHTML = <section className="text-gray-700 body-font my-20 ">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-5xl text-2xl font-medium title-font mb-4 text-gray-900">Word Frequency </h1>
                </div>
                <div className="flex flex-col text-center w-full overflow-x-auto">
                    <table className="contentTable text-left table-auto">
                        <thead>
                        <tr>
                            <th>
                                Document / Words
                            </th>
                            {heading}
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="active-row">
                            <td>Document 1</td>
                            {doc1Row}
                        </tr>
                        <tr className="active-row">
                            <td>Document 2</td>
                            {doc2Row}
                        </tr>
                        <tr className="active-row">
                            <td>Document 3</td>
                            {doc3Row}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        setFrequencyTable(frequencyTableHTML)
        const IDFTable = []
        const wordTable = []
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

        const inverseDocumentFrequencyHTML = <section className="text-gray-700 body-font my-20">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-5xl text-2xl font-medium title-font mb-4 text-gray-900">Inverse Document
                        Frequency </h1>
                </div>
                <div className="flex flex-col text-center w-full overflow-x-auto">
                    <table className="contentTable text-left ">
                        <thead>
                        <tr>
                            <th>
                                Word
                            </th>
                            {wordTable}
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="active-row">
                            <td>IDF</td>
                            {IDFTable}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

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
        // console.log(vectorTable)

        const vectorGenerationHTML = <section className="text-gray-700 body-font my-20">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full">
                    <h1 className="sm:text-5xl text-2xl font-medium title-font mb-4 text-gray-900">Document Vectors</h1>
                </div>
                <div className="flex flex-col text-center w-full overflow-x-auto">
                    <table className="contentTable text-left">
                        <thead>
                        <tr>
                            <th>
                                Documents / Words
                            </th>
                            {heading}
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="active-row">
                            <td>Query</td>
                            {vectorTable[0].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}
                        </tr>
                        <tr className="active-row">
                            <td>Document 1</td>
                            {vectorTable[1].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}
                        </tr>
                        <tr className="active-row">
                            <td>Document 2</td>
                            {vectorTable[2].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}

                        </tr>
                        <tr className="active-row">
                            <td>Document 3</td>
                            {vectorTable[3].map(value => <td key={nanoid()}>{value.toFixed(3)}</td>)}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        setVectorGeneration(vectorGenerationHTML)

        let sc1: [number, string] = [0, text1]
        let sc2: [number, string] = [0, text2]
        let sc3: [number, string] = [0, text3]
        let sc1Calc = []
        let sc2Calc = []
        let sc3Calc = []

        let sc1CalcHTML = []
        let sc2CalcHTML = []
        let sc3CalcHTML = []


        let i = 0
        for (const word in allWords) {
            if (vectorTable[0][i]) {
                if (vectorTable[1][i]) {
                    sc1[0] += vectorTable[0][i] * vectorTable[1][i]
                    // sc1Calc.push(<span>{vectorTable[0][i].toFixed(3)} ?? {vectorTable[1][i].toFixed(3)} ({word}){' '} + </span>)
                    sc1Calc.push([vectorTable[0][i].toFixed(3), vectorTable[1][i].toFixed(3), word])
                }
                if (vectorTable[2][i]) {
                    sc2[0] += vectorTable[0][i] * vectorTable[2][i]
                    sc2Calc.push([vectorTable[0][i].toFixed(3), vectorTable[2][i].toFixed(3), word])

                    // sc2Calc.push(<span>{vectorTable[0][i].toFixed(3)} ?? {vectorTable[2][i].toFixed(3)} ({word}) +</span>)
                }
                if (vectorTable[3][i]) {
                    sc3[0] += vectorTable[0][i] * vectorTable[3][i]
                    sc3Calc.push([vectorTable[0][i].toFixed(3), vectorTable[3][i].toFixed(3), word])

                    // sc3Calc.push(<span>{vectorTable[0][i].toFixed(3)} ?? {vectorTable[3][i].toFixed(3)} ({word}) +</span>)
                }
            }
            i++
        }
        for (let j = 0; j < sc1Calc.length; j++) {
            if (j == sc1Calc.length - 1) {
                sc1CalcHTML.push(<span>{sc1Calc[j][0]} ?? {sc1Calc[j][1]} ({sc1Calc[j][2]})</span>)
            } else {
                sc1CalcHTML.push(<span>{sc1Calc[j][0]} ?? {sc1Calc[j][1]} ({sc1Calc[j][2]})+ </span>)
            }
        }
        for (let j = 0; j < sc2Calc.length; j++) {
            if (j == sc2Calc.length - 1) {
                sc2CalcHTML.push(<span>{sc2Calc[j][0]} ?? {sc2Calc[j][1]} ({sc2Calc[j][2]})</span>)
            } else {
                sc2CalcHTML.push(<span>{sc2Calc[j][0]} ?? {sc2Calc[j][1]} ({sc2Calc[j][2]}) + </span>)
            }
        }
        for (let j = 0; j < sc2Calc.length; j++) {
            if (j == sc3Calc.length - 1) {
                sc3CalcHTML.push(<span>{sc3Calc[j][0]} ?? {sc3Calc[j][1]} ({sc3Calc[j][2]})</span>)
            } else {
                sc3CalcHTML.push(<span>{sc3Calc[j][0]} ?? {sc3Calc[j][1]} ({sc3Calc[j][2]}) + </span>)
            }
        }
        const sortedArr = [sc1, sc2, sc3].sort((a, b) => b[0] - a[0])

        const similarityCalculationHTML = <section className="container px-5 py-24 mx-auto text-center text-xl">
            <h1 className="sm:text-5xl text-2xl font-medium title-font mb-4 text-gray-900 mb-5">Final Calculation</h1>
            <div className="mb-5">
                <p className="italic text-4xl">SC(Q, D1)
                    <p className="text-xl mt-1">({text1})</p>
                </p>
                <p className="mt-4 text-3xl">{sc1CalcHTML} ??? <i>{sc1[0].toFixed(3)}</i></p>
            </div>
            <div className="mb-5">
                <p className="italic text-4xl">SC(Q, D2)
                    <p className="text-xl mt-1">({displayText(text2)})</p>
                </p>
                <p className="mt-4 text-3xl">{sc2CalcHTML} ??? <i>{sc2[0].toFixed(3)}</i></p>
            </div>
            <div className="mb-5">
                <p className="italic text-4xl">SC(Q, D3)
                    <p className="text-xl mt-1">({text3})</p>
                </p>
                <p className="mt-4 text-3xl">{sc3CalcHTML} ??? <i>{sc3[0].toFixed(3)}</i></p>
            </div>
            <div className="text-4xl">
                <p>Query is most <i>similar</i> to
                    <p className="text-2xl mt-5">
                        {sortedArr.map(a => <p className="" key={nanoid()}>{a[1]}<i>{' '}({a[0].toFixed(3)})</i></p>)}</p>
                </p>
            </div>
        </section>
        setSimilarityCalculations(similarityCalculationHTML)
        // setSimilarityResult(similarityResult)
    }

    return (
        <section className="dark:bg-gray-900">
            <Head>
                <title>Cosine Similarity Calculator</title>
                <meta name="description" content="Online Cosine Similarity Calculator"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <section className="flex">
                <h1 className="text-center text-4xl lg:text-6xl mb-12 pt-12 dark:text-white flex-grow">Cosine Similarity
                    Calculator</h1>
                {/*<button*/}
                {/*    aria-label="Toggle Dark Mode"*/}
                {/*    type="button"*/}
                {/*    className={styles.button}*/}
                {/*    style={{height: 60}}*/}
                {/*    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}*/}
                {/*>Dark Mode*/}
                {/*</button>*/}
            </section>

            <Form onSubmit={calculateCosineSimilarity}/>
            {frequencyTable}
            <div className="m-2"/>
            {inverseDocumentFrequency}
            <div className="m-2"/>
            {vectorGeneration}
            <div className="m-2"/>
            {similarityCalculations}
            <div className="m-2"/>
            <footer className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-white"
                       href="">
                        <span className="ml-3 text-xl">Made with NextJS</span>
                    </a>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="ml-3 text-gray-400" target="_blank" rel="noreferrer" href="https://github.com/dtr-beast/Cosine-Similarity">
                            <img src="/static/images/github-light.png" alt="GitHub Logo" width={48} height={48}/>
                        </a>
                    </span>
                </div>
            </footer>
        </section>
    )
}
