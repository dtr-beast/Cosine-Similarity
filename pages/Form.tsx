import {FormEvent, useState} from "react";
import styled from "styled-components";
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

const Textarea = styled.textarea`
  //border: 1px black solid;
  //border-radius: 5px;
  //align-self: center;
  height: 200px;
  font-size: 1.2em;
  //width: 100%;
  padding: 15px;
`

const Button = styled.button`
  //border-radius: 5px;
  //margin: 10px;
  //padding: 0 10px;
  //background: blueviolet;
  //font-size: 2em;
  //text-align: center;
`

const Label = styled.label`
  font-size: 2.5em;
`
interface Params {
    onSubmit: ({query, text1, text2, text3}: IDFParams) => void
}
export default function Form({onSubmit}: Params) {
    async function calculateSimilarity(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        onSubmit({query, text1, text2, text3})
    }
    const [query, setQuery] = useState('')
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')

    return (
        <>
            <form onSubmit={calculateSimilarity}>

                <div>
                    <div>
                        <Label htmlFor="query" className="dark:text-white">Query *</Label>
                        <button type="button" className={styles.button} onClick={() => setQuery(randomSentence({max: 10}))}>Randomize</button>
                    </div>
                    <div className="text-center">
                        <Textarea className="dark:bg-gray-800 w-1/2 border-8 border-blue-400 rounded-3xl" value={query} onChange={e => setQuery(e.target.value)} required/>
                    </div>
                </div>
                <div>
                    <div>
                        <Label htmlFor="document1">Document 1*</Label>
                        <Button type="button" className="dark:text-white" onClick={() => setText1(randomSentence({min: 2, max: 10}))}>Randomize</Button>
                    </div>
                    <Textarea className="bg-white dark:bg-gray-800 w-full" value={text1} onChange={e => setText1(e.target.value)} required/>
                </div>

                <div>
                    <div>
                        <Label htmlFor="document2">Document 2</Label>
                        <Button type="button" className="dark:text-white" onClick={() => setText2(randomSentence({min: 2, max: 10}))}>Randomize</Button>
                    </div>
                    <Textarea className="bg-white dark:bg-gray-800" value={text2} onChange={e => setText2(e.target.value)}/>
                </div>
                <div>
                    <div>
                        <Label htmlFor="document3">Document 3</Label>
                        <Button type="button" className="dark:text-white" onClick={() => setText3(randomSentence({min: 2, max: 10}))}>Randomize</Button>
                    </div>
                    <Textarea className="bg-white dark:bg-gray-800" value={text3} onChange={e => setText3(e.target.value)}/>
                </div>

                <Button type="submit" className="dark:text-white">Calculate</Button>
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
