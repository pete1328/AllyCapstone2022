import React from "react";
import envelope from '../assets/test.svg';
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { TryNowButton, BackButton, HomeButton, NextButton } from "../components/Button";

export function KudosPage () {
    return (
        <main>
            <div className="flex justify-center h-screen w-screen">
                <img className="z-0 fixed place-self-center rotate-[25deg] w-[1000px] mb-24" src={envelope} alt="envelope"/>
                <div className="z-10 fixed flex place-self-center">
                    <div className="place-self-center">
                        <div className="bg-white w-[878px] h-[556px] drop-shadow-xl rounded-lg p-10">
                            <div className="w-full flex justify-between">
                                <h1 className="font-poppins font-medium text-[54px]">Make Someone's day better</h1>
                                <div className="w-1/2">
                                    <div className="bg-[#E5E5E5] w-[257px] h-[128px] rounded-lg">
                                        <div className="p-4">
                                            <p className="font-poppins text-[18px]">At a loss for words? Try our gratitude wizard.</p>
                                            <div className="flex w-full justify-center py-1">
                                                <TryNowButton/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-center space-x-4 pt-6">
                                    <TextField 
                                        className="w-2/5"
                                        id="outlined-basic"
                                        label="Select the person" 
                                        variant="outlined"/>
                                    <TextField 
                                        className="w-2/5"
                                        id="outlined-basic"
                                        label="Enter kudos points"
                                        variant="outlined"/>
                                </div>
                                <div className="w-full flex justify-center py-6">
                                    <TextField
                                        className="w-[654px]"
                                        id="standard-multiline-static"
                                        label="Write your message down"
                                        multiline
                                        rows={4}/>
                                </div>
                                <div className="w-full flex justify-center space-x-6">
                                    <BackButton/>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <NextButton/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}