import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import { questions, choices, punctuation } from './TestData';
import axios from 'axios';
import { ml_prefix } from '..';


export function KudosWizard(props) {
    const [section, setSection] = useState(0);
    const [addition, setAddition] = useState("");
    const [receipient, setReceipient] = useState("");

    const word_suggest_url = ml_prefix + "/api/wordSuggest";

    function updateParent(page, sender, reciever, receipient_id, message, gif, font, points) {
        props.onChange(page, sender, reciever, receipient_id, message, gif, font, points)
    }

    const userSelect = (event, value) => {
        if (value != null) {
            setReceipient(value["id"]);
            setAddition(value["name"]);
        } else {
            setReceipient(0);
            setAddition("");
        }
    }

    // axios request for ML
    const wordSuggestion = () => {
        axios.get(word_suggest_url, { params: {
          message: props.draft,
        }})
        .then(response => {
            let word_list = response.data.result;
            updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points);

        })
        .catch(error => {
            console.log(error);
        });
      }

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] sm:w-[65rem] 2xl:w-[80rem]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center h-screen flex items-center">
                            <div className="bg-grape sm:w-[878px] 2xl:w-[1400px] h-2/3 drop-shadow-xl rounded-lg px-10 flex items-center">
                                <div className="w-full h-3/4 flex justify-between space-x-10">
                                    <div>
                                        <h1 className={"font-medium text-[40px] w-1/2 md:w-full font-serif text-white"}>{questions[section]}</h1>
                                        <div className="py-6">
                                            {choices[section].map((text, id) =>
                                                <button
                                                className={addition === text ? "border border-blueberry m-2 rounded-full text-xs p-4 bg-seafoam text-white " : "border border-blueberry bg-champagne m-2 rounded-full text-xs p-4 "}
                                                key={id} 
                                                value={text}
                                                onClick={(e) => {
                                                    updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points);
                                                    setAddition(e.target.value);
                                                    }}>
                                                    {text}
                                                </button>  
                                            )}
                                        </div>
                                        <div className="w-full flex justify-center pt-6">
                                            { section === 0 &&
                                                <Autocomplete
                                                    className='bg-white rounded-lg'
                                                    fullWidth={true}
                                                    disablePortal
                                                    options={props.users}
                                                    getOptionLabel={(option) => option.name || ""}
                                                    sx={{ width: 300 }}
                                                    renderInput={(params) => <TextField {...params}/>}
                                                    onChange={userSelect}
                                                />
                                            }
                                            { section > 0 &&
                                                <TextField 
                                                    className="w-[250px] md:w-[450px] bg-champagne rounded-lg"
                                                    id="outlined-basic"
                                                    label="Write your own"
                                                    variant="outlined"
                                                    value={addition}
                                                    onChange={(e) => {
                                                        updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points); 
                                                        setAddition(e.target.value);
                                                        }}/>
                                            }
                                        </div>
                                        <div className="w-full">
                                            <div className="w-full flex justify-center space-x-6 pt-8">
                                                <Link to="/dashboard">
                                                    <HomeButton/> 
                                                </Link>
                                                <div onClick={() => {
                                                    if (addition.length > 0) {
                                                        if (section === 4) {
                                                            updateParent(kudosStateOptions.Gif, props.sender, props.reciever, receipient, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                        } else {
                                                            setSection(section + 1)
                                                            if (section === 0) {
                                                                updateParent(kudosStateOptions.Wizard, props.sender, addition, receipient, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                            } else {
                                                                updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, receipient, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                            }
                                                        }
                                                        setAddition("");
                                                    }}}>
                                                    <NextButton disabled={addition.length === 0}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex border border-blueberry bg-champagne'>
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
                    <div className="bg-grape border-4 border-blueberry drop-shadow-lg">
                        <div className="flex-nowrap justify-center text-center pt-12 w-full">
                            <h1 className={"p-2 font-medium text-[40px] w-full md:w-full font-serif text-white"}>{questions[section]}</h1>
                            <div className="w-full h-80 py-4 flex justify-center">
                                <div className='w-3/4 flex border border-blueberry bg-champagne'>
                                    <p className={"p-2 text-left text-2xl ".concat(props.font)}>{props.draft + " " + addition}</p>
                                </div>
                            </div>
                            <div className="py-6">
                                {choices[section].map((text, id) =>
                                    <button
                                    className={addition === text ? "border border-blueberry m-2 rounded-full text-xs p-4 bg-seafoam text-white " : "border border-blueberry bg-champagne m-2 rounded-full text-xs p-4 "}
                                    key={id} 
                                    value={text}
                                    onClick={(e) => {
                                        updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points);
                                        setAddition(e.target.value);
                                        }}>
                                        {text}
                                    </button>  
                                )}
                            </div>
                            <div className="w-full flex justify-center pt-6">
                                { section === 0 &&
                                    <Autocomplete
                                        className='bg-champagne rounded-lg'
                                        fullWidth={true}
                                        disablePortal
                                        options={props.users}
                                        getOptionLabel={(option) => option.name || ""}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params}/>}
                                        onChange={userSelect}
                                    />
                                }
                                { section > 0 &&
                                    <TextField 
                                        className="w-3/4 bg-champagne rounded-lg"
                                        id="outlined-basic"
                                        label="Write your own"
                                        variant="outlined"
                                        value={addition}
                                        onChange={(e) => {
                                            updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points); 
                                            setAddition(e.target.value);
                                            }}/>
                                }
                            </div>
                            <div className="w-full py-6 flex justify-center">
                                <div className="flex space-x-6 pb-6">
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        if (addition.length > 0) {
                                            if (section === 4) {
                                                updateParent(kudosStateOptions.Gif, props.sender, props.reciever, receipient, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                            } else {
                                                setSection(section + 1)
                                                if (section === 0) {
                                                    updateParent(kudosStateOptions.Wizard, props.sender, addition, receipient, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                } else {
                                                    updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, receipient, props.draft + " " + addition + punctuation[section], props.gif, props.font, props.points)
                                                }
                                            }
                                            setAddition("");
                                        }}}>
                                        <NextButton disabled={addition.length === 0}/>
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