import {FormEvent, useState} from "react";
// import styled from "styled-components";
// const randomSentence = require('random-sentence');
// @ts-ignore
import randomSentence from 'random-sentence';
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
    onSubmit: ({query, text1, text2, text3}: IDFParams) => void
}
export default function Form({onSubmit}: Params) {
    async function calculateSimilarity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("Clicked")
        onSubmit({query, text1, text2, text3})
    }
    const [query, setQuery] = useState('')
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')
    function fill(){
        setQuery('gold silver truck')
        setText1('Shipment of gold damaged in a fire')
        setText2('Delivery of silver arrived in a silver truck')
        setText3('Shipment of gold arrived in a truck')
    }
    return (
        <>
            <form onSubmit={calculateSimilarity}>
                <div>
                    <div>
                        <label className="dark:text-white">Query *</label>
                        <button type="button" className={styles.button} onClick={fill}>Randomize</button>
                    </div>
                    <div className="text-center">
                        <textarea className="dark:bg-gray-800 w-1/2 border-8 border-blue-400 rounded-3xl" value={query} onChange={e => setQuery(e.target.value)} required/>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Document 1*</label>
                        <button type="button" className="dark:text-white" onClick={() => setText1(randomSentence({min: 2, max: 10}))}>Randomize</button>
                    </div>
                    <textarea className="bg-white dark:bg-gray-800 w-full" value={text1} onChange={e => setText1(e.target.value)} required/>
                </div>

                <div>
                    <div>
                        <label>Document 2</label>
                        <button type="button" className="dark:text-white" onClick={() => setText2(randomSentence({min: 2, max: 10}))}>Randomize</button>
                    </div>
                    <textarea className="bg-white dark:bg-gray-800" value={text2} onChange={e => setText2(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <label>Document 3</label>
                        <button type="button" className="dark:text-white" onClick={() => setText3(randomSentence({min: 2, max: 10}))}>Randomize</button>
                    </div>
                    <textarea className="bg-white dark:bg-gray-800" value={text3} onChange={e => setText3(e.target.value)}/>
                </div>

                <button type="submit" className="dark:text-white">Calculate</button>
            </form>
        </>
    )
}

/*
<!-- HTML !-->
<button class="button-28" role="button">Button 28</button>

.button-28 {
    appearance: none;
    background-color: transparent;
    border: 2px solid #1A1A1A;
    border-radius: 15px;
    box-sizing: border-box;
    color: #3B3B3B;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    min-height: 60px;
    min-width: 0;
    outline: none;
    padding: 16px 24px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
    will-change: transform;
}

.button-28:disabled {
    pointer-events: none;
}

.button-28:hover {
    color: #fff;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
}

.button-28:active {
    box-shadow: none;
    transform: translateY(0);
}
 */
