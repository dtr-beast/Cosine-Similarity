import {FormEvent, useState} from "react";
import styled from "styled-components";
// const randomSentence = require('random-sentence');
// @ts-ignore
import randomSentence from 'random-sentence';
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
  border: 1px black solid;
  border-radius: 5px;
  align-self: center;
  //margin: 10px 100px 20px 20px;
  height: 200px;
  //margin: 3em;
  color: white;
  font-size: 1.2em;
  width: 100%;
  padding: 15px;
`

const Button = styled.button`
  border-radius: 5px;
  margin: 10px;
  padding: 0 10px;
  background: blueviolet;
  color: white;
  font-size: 2em;
  text-align: center;
`
const Label = styled.label`
  font-size: 2.5em;
  color: blueviolet;
`
export default function Form() {
    async function registerUser(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }
    const [query, setQuery] = useState('')
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [text3, setText3] = useState('')

    return (

        <>
            <form onSubmit={registerUser}>
                <div>
                    <div>
                        <Label htmlFor="query">Query *</Label>
                        <Button type="button" onClick={() => setQuery(randomSentence({min: 30, max: 100}))}>Randomize</Button>
                    </div>
                    <div style={{maxWidth: "max-content"}}>
                        <Textarea className="bg-white dark:bg-gray-800 mx-20" value={query} onChange={e => setQuery(e.target.value)} required/>
                    </div>
                </div>
                <div>
                    <div>
                        <Label htmlFor="document1">Document 1*</Label>
                        <Button type="button" onClick={() => setText1(randomSentence({min: 20, max: 100}))}>Randomize</Button>
                    </div>
                    <Textarea className="bg-white dark:bg-gray-800" value={text1} onChange={e => setText1(e.target.value)} required/>
                </div>

                <div>
                    <div>
                        <Label htmlFor="document2">Document 2</Label>
                        <Button type="button" onClick={() => setText2(randomSentence({min: 20, max: 100}))}>Randomize</Button>
                    </div>
                    <Textarea className="bg-white dark:bg-gray-800" value={text2} onChange={e => setText2(e.target.value)} required/>
                </div>
                <div>
                    <div>
                        <Label htmlFor="document3">Document 3</Label>
                        <Button type="button" onClick={() => setText3(randomSentence({min: 20, max: 100}))}>Randomize</Button>
                    </div>
                    <Textarea className="bg-white dark:bg-gray-800" value={text3} onChange={e => setText3(e.target.value)} required/>
                </div>

                <Button type="submit">Calculate</Button>
            </form>
        </>
    )
}
