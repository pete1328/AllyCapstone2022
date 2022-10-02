import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import { questions, choices, punctuation } from './TestData';

export function KudosWizard(props) {
    const [section, setSection] = useState(0)
    const [addition, setAddition] = useState("")

    function updateParent(page, message, gif, font, points) {
        props.onChange(page, message, gif, font, points)
    }

    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="z-0 fixed place-self-center rotate-[10deg] w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[878px] h-[556px] drop-shadow-xl rounded-lg px-10 flex items-center">
                        <div className="w-full flex justify-between space-x-8">
                            <div>
                                <h1 className={"font-medium text-[40px] w-full font-poppins"}>{questions[section]}</h1>
                                <div className="py-6">
                                    {choices[section].map((text, id) =>
                                        <button
                                        className={addition === text ? "border border-[#707070] m-2 rounded-full text-xs p-4 bg-black text-white " : "border border-[#707070] m-2 rounded-full text-xs p-4 "}
                                        key={id} 
                                        value={text}
                                        onClick={(e) => {
                                            updateParent(kudosStateOptions.Wizard, props.draft, props.gif, props.font, props.points);
                                            setAddition(e.target.value);
                                            }}>
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
                                        value={addition}
                                        onChange={(e) => {
                                            updateParent(kudosStateOptions.Wizard, props.draft, props.gif, props.font, props.points); 
                                            setAddition(e.target.value);
                                            }}/>
                                </div>
                                <div className="w-full">
                                    <div className="w-full flex justify-center space-x-6 pt-8">
                                        <Link to="/dashboard">
                                            <HomeButton/> 
                                        </Link>
                                        <div onClick={() => {
                                            if (section === 4) {
                                                updateParent(kudosStateOptions.Gif, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                            } else {
                                                setSection(section + 1)
                                                updateParent(kudosStateOptions.Wizard, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                            }
                                            setAddition("");
                                            }}>
                                            <NextButton/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex grow-0 border border-[#707070]'>
                                <p className={"p-2 text-2xl ".concat(props.font)}>{props.draft + " " + addition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}