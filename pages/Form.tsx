import {FormEvent, useState} from "react";
// import styled from "styled-components";
// const randomSentence = require('random-sentence');
// @ts-ignore
// import randomSentence from 'random-sentence';
import styles from '../styles/Button.module.css'
import {IDFParams} from "./index";
// interface CustomEventTarget extends EventTarget {
//     query: HTMLInputElement
//     document1: HTMLInputElement
//     document2: HTMLInputElement
//     document3: HTMLInputElement
// }
//
// interface HTMLCustomForm extends FormEvent<HTMLFormElement> {
//     target: CustomEventTarget
// }

// const Textarea = styled.textarea`
//   //border: 1px black solid;
//   //border-radius: 5px;
//   //align-self: center;
//   height: 200px;
//   font-size: 1.2em;
//   //width: 100%;
//   padding: 15px;
// `

// const Button = styled.button`
//   //border-radius: 5px;
//   //margin: 10px;
//   //padding: 0 10px;
//   //background: blueviolet;
//   //font-size: 2em;
//   //text-align: center;
// `

// const label = styled.label`
//   font-size: 2.5em;
// `
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
        setQuery('gold silver truck')
        setText1('Shipment of gold damaged in a fire')
        setText2('Delivery of silver arrived in a silver truck')
        setText3('Shipment of gold arrived in a truck')
    }

    return (
        <>
            <form onSubmit={calculateSimilarity} className="container px-72 pt-24 mx-auto">
                <div className=" ">
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
                <div className="pt-24">
                    <div className="mb-10">
                        <label className="dark:text-white font-bold text-3xl mr-4">Document 1*</label>
                    </div>
                    <div className="text-center">
                        <textarea
                            className="w-full dark:bg-gray-800 w-1/2 border-8 border-blue-400 rounded-3xl h-40 p-3 outline-none"
                            value={text1} onChange={e => setText1(e.target.value)} required/>
                    </div>
                </div>
                <div className="pt-24">
                    <div className="mb-10">
                        <label className="dark:text-white font-bold text-3xl mr-4">Document 2</label>
                    </div>
                    <div className="text-center">
                        <textarea
                            className="w-full dark:bg-gray-800 w-1/2 border-8 border-blue-400 rounded-3xl h-40 p-3 outline-none"
                            value={text2} onChange={e => setText2(e.target.value)}/>
                    </div>
                </div>
                <div className="pt-24 pb-12">
                    <div className="mb-10">
                        <label className="dark:text-white font-bold text-3xl mr-4">Document 3</label>
                    </div>
                    <div className="text-center">
                        <textarea
                            className="w-full dark:bg-gray-800 w-1/2 border-8 border-blue-400 rounded-3xl h-40 p-3 outline-none"
                            value={text3} onChange={e => setText3(e.target.value)}/>
                    </div>
                </div>
                <div className="flex">
                    <button type="submit" className={styles.button}
                            style={{fontSize: 50, margin: "auto", fontWeight: "bold", borderRadius: 35}}>Calculate
                    </button>
                </div>
            </form>
        </>
    )
}
