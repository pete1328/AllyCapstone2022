import { React, useState } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';

export function KudosFont(props) {
    const [options] = useState([0, 1, 2, 3, 4, 5])

    function updateParent(page, message, gif, font, points) {
        props.onChange(page, message, gif, font, points);
    }

    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="z-0 fixed place-self-center rotate-[10deg] w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[878px] h-[556px] drop-shadow-xl rounded-lg px-10 flex items-center">
                        <div className="w-full flex justify-between space-x-8">
                            <div>
                                <h1 className="font-poppins font-medium text-[40px] w-full">Select a style</h1>
                                <div className="py-4">
                                    {options.map((style, id) =>
                                        <button
                                        className="border-[10px] border-[#C2C2C2] m-2 text-xl p-4 font-poppins"
                                        key={id} 
                                        value="Aa"
                                        onClick={(e) => {
                                            updateParent(kudosStateOptions.Font, props.draft, props.gif, props.font, props.points)}}>
                                            Aa
                                        </button>
                                    )}
                                </div>
                                <div className="w-full">
                                    <div className="w-full flex justify-center space-x-6 pt-8">
                                        <div onClick={() => {updateParent(kudosStateOptions.Result, props.draft, props.gif, props.font, props.points)}}>
                                            <BackButton/>
                                        </div>
                                        <Link to="/dashboard">
                                            <HomeButton/> 
                                        </Link>
                                        <div onClick={() => {updateParent(kudosStateOptions.Share, props.draft, props.gif, props.font, props.points)}}>
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