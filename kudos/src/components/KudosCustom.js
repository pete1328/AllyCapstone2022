import React from 'react';
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { TryNowButton, BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';

export function KudosCustom(props) {
    function updateParent(page, message, gif) {
        props.onChange(page, message, gif);
    }

    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="z-0 fixed place-self-center rotate-[10deg] w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[878px] h-[556px] drop-shadow-xl rounded-lg p-10">
                        <div className="w-full flex justify-between">
                            <h1 className="font-poppins font-medium text-[54px]">Make Someone's day better</h1>
                            <div className="w-1/2">
                                <div className="bg-[#E5E5E5] w-[257px] h-[128px] rounded-lg">
                                    <div className="p-4">
                                        <p className="font-poppins text-[18px]">At a loss for words? Try our gratitude wizard.</p>
                                        <div className="flex w-full justify-center py-1" onClick={() => {updateParent(kudosStateOptions.Wizard, props.draft, props.gif)}}>
                                            <TryNowButton/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full flex justify-center space-x-4 pt-6">
                                <TextField 
                                    className="w-[654px]"
                                    id="outlined-basic"
                                    label="Select the person" 
                                    variant="outlined"/>
                            </div>
                            <div className="w-full flex justify-center py-6">
                                <TextField
                                    className="w-[654px]"
                                    id="standard-multiline-static"
                                    label="Write your message down"
                                    multiline
                                    onChange={(e) => {updateParent(kudosStateOptions.Custom, e.target.value, props.gif)}}
                                    defaultValue={props.draft}
                                    rows={4}/>
                            </div>
                            <div className="w-full flex justify-center space-x-6">
                                <Link to="/dashboard">
                                    <BackButton/> 
                                </Link>
                                <Link to="/dashboard">
                                    <HomeButton/> 
                                </Link>
                                <div onClick={() => {updateParent(kudosStateOptions.Gif, props.draft, props.gif)}}>
                                    <NextButton/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}