import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';

export function KudosWizard(props) {
    const [question] = useState("What's ...?")
    const [options] = useState(["Option 1", "Option 2"])
    const [message, setMessage] = useState('')

    function changePage(page) {
        props.onChange(page);
    }

    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="z-0 fixed place-self-center rotate-[10deg] w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[878px] h-[556px] drop-shadow-xl rounded-lg px-10 flex items-center">
                        <div className="w-full flex justify-between space-x-8">
                            <div className='py-20'>
                                <h1 className="font-poppins font-medium text-[40px] w-full">{question}</h1>
                                <div className="py-4">
                                    {options.map((text, id) =>
                                        <button
                                        className="border border-[#707070] mx-2 rounded-full text-xs p-4 font-poppins"
                                        key={id} 
                                        value={text}
                                        onClick={(e) => {
                                            setMessage(e.target.value)}}>
                                            {text}
                                        </button>  
                                    )}
                                </div>
                                <div className="w-full flex justify-center pt-6">
                                    <TextField 
                                        className="w-[450px]"
                                        id="outlined-basic"
                                        label="Write your own"
                                        variant="outlined"
                                        onChange={(e) => {setMessage(e.target.value)}}/>
                                </div>
                                <div className="w-full">
                                    <div className="w-full flex justify-center space-x-6 pt-8">
                                        <div onClick={() => {changePage(kudosStateOptions.Custom)}}>
                                            <BackButton/>
                                        </div>
                                        <Link to="/dashboard">
                                            <HomeButton/> 
                                        </Link>
                                        <div onClick={() => {changePage(kudosStateOptions.Gif)}}>
                                            <NextButton/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex grow-0 border border-[#707070]'>
                                <p className='p-2 font-poppins'>{message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}