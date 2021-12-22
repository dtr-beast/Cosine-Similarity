import {FormEvent, useState} from "react";
import styles from '../styles/Button.module.css'
import InputCard from "./InputCard";

interface Params {
    onSubmit: (query: string, text1: string, text2: string, text3: string) => void
}

export default function Form({onSubmit}: Params) {
    async function calculateSimilarity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit(query.toLowerCase(), text1.toLowerCase(), text2.toLowerCase(), text3.toLowerCase())
    }

    const [query, setQuery] = useState('')
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')

    function fill() {
        const testCases =
            [
                [
                    "gold silver truck",
                    "Shipment of gold damaged in a fire",
                    "Delivery of silver arrived in a silver truck",
                    "Shipment of gold arrived in a truck"
                ],
                [
                    "New York Times",
                    "New York Past",
                    "Los Angeles Past",
                    "New New Times"
                ]
            ]
        const randomTestCase = testCases[Math.floor(Math.random() * testCases.length)]
        console.log(randomTestCase)
        setQuery(randomTestCase[0])
        setText1(randomTestCase[1])
        setText2(randomTestCase[2])
        setText3(randomTestCase[3])
    }

    return (
        <>
            <form onSubmit={calculateSimilarity} className="container px-6 pt-2 lg:px-72 lg:pt-24 mx-auto">
                <div>
                    <div className="mb-10">
                        <label className="dark:text-white font-bold text-3xl mr-4">Query*</label>
                        <button type="button" className={styles.button} onClick={fill}>Randomize</button>
                    </div>
                    <div className="text-center">
                        <textarea
                            className="w-full dark:bg-gray-800 w-1/2 border-8 border-blue-400 rounded-3xl h-40 p-3 outline-none"
                            value={query} onChange={e => setQuery(e.target.value)} required/>
                    </div>
                </div>
                <InputCard required labelValue="Document 1*" value={text1} setValue={setText1}/>
                <InputCard labelValue="Document 2" value={text2} setValue={setText2}/>
                <InputCard labelValue="Document 3" value={text3} setValue={setText3}/>
                <div className="flex mt-10">
                    <button type="submit" className={styles.button}
                            style={{fontSize: 50, margin: "auto", fontWeight: "bold", borderRadius: 35}}>Calculate
                    </button>
                </div>
            </form>
        </>
    )
}
