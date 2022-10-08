import React from 'react';
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { TryNowButton, BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';

export function KudosCustom(props) {
    function updateParent(page, sender, reciever, message, gif, font, points) {
        props.onChange(page, sender, reciever, message, gif, font, points);
    }

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[55rem]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center">
                            <div className="bg-white w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10">
                                <div className="w-full md:flex justify-between">
                                    <h1 className="font-poppins font-medium text-[54px]">Make Someone's day better</h1>
                                    <div className="w-1/2">
                                        <div className="bg-[#E5E5E5] w-[257px] h-[128px] rounded-lg">
                                            <div className="p-4">
                                                <p className="font-poppins text-[18px]">At a loss for words? Try our gratitude wizard.</p>
                                                <div className="flex w-full justify-center py-1" onClick={() => {updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, "", props.gif, props.font, props.points)}}>
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
                                            variant="outlined"
                                            onChange={(e) => {updateParent(kudosStateOptions.Custom, props.sender, e.target.value, props.draft, props.gif, props.font, props.points)}}
                                            />
                                    </div>
                                    <div className="w-full flex justify-center py-6">
                                        <TextField
                                            className="w-[654px]"
                                            id="standard-multiline-static"
                                            label="Write your message down"
                                            multiline
                                            onChange={(e) => {updateParent(kudosStateOptions.Custom, props.sender, props.reciever, e.target.value, props.gif, props.font, props.points)}}
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
                                        <div onClick={() => {updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.draft, props.gif, props.font, props.points)}}>
                                            <NextButton/>
                                        </div>
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
                            <h1 className="p-2 font-poppins font-medium text-4xl">Make Someone's day better</h1>
                            <div className="w-full flex justify-center pt-4">
                                <div className="w-3/4 h-auto p-4 bg-[#E5E5E5]">
                                    <p className="font-poppins text-[18px] py-4">At a loss for words? Try our gratitude wizard.</p>
                                    <div onClick={() => {updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, "", props.gif, props.font, props.points)}}>
                                        <TryNowButton/>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div>
                                    <div className="w-full flex justify-center space-x-4 pt-6">
                                        <TextField 
                                            className="w-3/4"
                                            id="outlined-basic"
                                            label="Select the person" 
                                            variant="outlined"
                                            onChange={(e) => {updateParent(kudosStateOptions.Custom, props.sender, e.target.value, props.draft, props.gif, props.font, props.points)}}
                                            />
                                    </div>
                                    <div className="w-full flex justify-center py-6">
                                        <TextField
                                            className="w-3/4"
                                            id="standard-multiline-static"
                                            label="Write your message down"
                                            multiline
                                            onChange={(e) => {updateParent(kudosStateOptions.Custom, props.sender, props.reciever, e.target.value, props.gif, props.font, props.points)}}
                                            defaultValue={props.draft}
                                            rows={4}/>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center space-x-6 pb-6">
                                    <Link to="/dashboard">
                                        <BackButton/> 
                                    </Link>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.draft, props.gif, props.font, props.points)}}>
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