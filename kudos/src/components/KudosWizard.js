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

    function updateParent(page, sender, reciever, message, gif, font, points) {
        props.onChange(page, sender, reciever, message, gif, font, points)
    }

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[55rem]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center">
                            <div className="bg-white w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex items-center">
                                <div className="w-full flex justify-between space-x-8">
                                    <div>
                                        <h1 className={"font-medium text-[40px] w-1/2 md:w-full font-poppins"}>{questions[section]}</h1>
                                        <div className="py-6">
                                            {choices[section].map((text, id) =>
                                                <button
                                                className={addition === text ? "border border-[#707070] m-2 rounded-full text-xs p-4 bg-black text-white " : "border border-[#707070] m-2 rounded-full text-xs p-4 "}
                                                key={id} 
                                                value={text}
                                                onClick={(e) => {
                                                    updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.draft, props.gif, props.font, props.points);
                                                    setAddition(e.target.value);
                                                    }}>
                                                    {text}
                                                </button>  
                                            )}
                                        </div>
                                        <div className="w-full flex justify-center pt-6">
                                            <TextField 
                                                className="w-[250px] md:w-[450px]"
                                                id="outlined-basic"
                                                label="Write your own"
                                                variant="outlined"
                                                value={addition}
                                                onChange={(e) => {
                                                    updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.draft, props.gif, props.font, props.points); 
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
                                                        updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                    } else {
                                                        setSection(section + 1)
                                                        if (section === 0) {
                                                            updateParent(kudosStateOptions.Wizard, props.sender, addition, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                        } else {
                                                            updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                        }
                                                    }
                                                    setAddition("");
                                                    }}>
                                                    <NextButton/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex border border-[#707070]'>
                                        <p className={"p-2 text-2xl ".concat(props.font)}>{props.draft + " " + addition}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/** Mobile View */}
            { props.mobile === 1 &&
                <div className="p-6">
                    <div className="bg-white border-4 border-[#D4D4D4] drop-shadow-lg">
                        <div className="flex-nowrap justify-center text-center pt-12 w-full">
                            <h1 className={"p-2 font-medium text-[40px] w-full md:w-full font-poppins"}>{questions[section]}</h1>
                            <div className="w-full h-80 py-4 flex justify-center">
                                <div className='w-3/4 flex border border-[#707070]'>
                                    <p className={"p-2 text-left text-2xl ".concat(props.font)}>{props.draft + " " + addition}</p>
                                </div>
                            </div>
                            <div className="py-6">
                                {choices[section].map((text, id) =>
                                    <button
                                    className={addition === text ? "border border-[#707070] m-2 rounded-full text-xs p-4 bg-black text-white " : "border border-[#707070] m-2 rounded-full text-xs p-4 "}
                                    key={id} 
                                    value={text}
                                    onClick={(e) => {
                                        updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.draft, props.gif, props.font, props.points);
                                        setAddition(e.target.value);
                                        }}>
                                        {text}
                                    </button>  
                                )}
                            </div>
                            <div className="w-full flex justify-center pt-6">
                                <TextField 
                                    className="w-3/4"
                                    id="outlined-basic"
                                    label="Write your own"
                                    variant="outlined"
                                    value={addition}
                                    onChange={(e) => {
                                        updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.draft, props.gif, props.font, props.points); 
                                        setAddition(e.target.value);
                                        }}/>
                            </div>
                            <div className="w-full py-6 flex justify-center">
                                <div className="flex space-x-6 pb-6">
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        if (section === 4) {
                                            updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                        } else {
                                            setSection(section + 1)
                                            if (section === 0) {
                                                updateParent(kudosStateOptions.Wizard, props.sender, addition, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                            } else {
                                                updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                            }
                                        }
                                        setAddition("");
                                        }}>
                                        <NextButton/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}