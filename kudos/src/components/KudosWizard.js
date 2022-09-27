import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';

/*
    Who : 0,
    What : 1,
    Why : 2,
    When : 3,
    Extra : 4
*/

export function KudosWizard(props) {
    const [section, setSection] = useState(0)
    const [question] = useState("What's the ocassion?")
    const [options] = useState(["Complemented my outfit", "Happy Birthday!", "Ahead of schedule", "Covered my shift!", "Was very helpful!"])

    function updateParent(page, message, gif, font, points) {
        props.onChange(page, message, gif, font, points);
    }

    return (
        <div className="flex justify-center h-screen w-screen">
            <p>{section}</p>
            <img className="z-0 fixed place-self-center rotate-[10deg] w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[878px] h-[556px] drop-shadow-xl rounded-lg px-10 flex items-center">
                        <div className="w-full flex justify-between space-x-8">
                            <div>
                                <h1 className="font-poppins font-medium text-[40px] w-full">{question}</h1>
                                <div className="py-4">
                                    {options.map((text, id) =>
                                        <button
                                        className="border border-[#707070] m-2 rounded-full text-xs p-4 font-poppins"
                                        key={id} 
                                        value={text}
                                        onClick={(e) => {
                                            updateParent(kudosStateOptions.Wizard, e.target.value, props.gif, props.font, props.points)}}>
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
                                        onChange={(e) => {updateParent(kudosStateOptions.Wizard, e.target.value, props.gif, props.font, props.points)}}/>
                                </div>
                                <div className="w-full">
                                    <div className="w-full flex justify-center space-x-6 pt-8">
                                    <div onClick={() => {
                                            if (section === 0) {
                                                updateParent(kudosStateOptions.Custom, props.draft, props.gif, props.font, props.points)
                                            } else {
                                                setSection(section - 1)
                                            }}}>
                                            <BackButton/>
                                        </div>
                                        <Link to="/dashboard">
                                            <HomeButton/> 
                                        </Link>
                                        <div onClick={() => {
                                            if (section === 4) {
                                                updateParent(kudosStateOptions.Gif, props.draft, props.gif, props.font, props.points)
                                            } else {
                                                setSection(section + 1)
                                            }}}>
                                            <NextButton/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full flex grow-0 border border-[#707070]'>
                                <p className='p-2 font-poppins'>{props.draft}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}