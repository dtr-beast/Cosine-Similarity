import React from "react";

interface Param {
    labelValue: string,
    required?: boolean,
    value: string
    setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function InputCard({labelValue, setValue, value, required = false}: Param) {
    return (
        <div className="pt-4 lg:pt-24">
            <div className="mb-10">
                <label className="dark:text-white font-bold text-3xl mr-4">{labelValue}</label>
            </div>
            <div className="text-center">
                        <textarea
                            className="w-full dark:bg-gray-800 w-1/2 border-8 border-blue-400 rounded-3xl h-40 p-3 outline-none"
                            value={value} onChange={e => setValue(e.target.value)} required={required}/>
            </div>
        </div>
    )
}
