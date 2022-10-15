import { React, useState } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import axios from "axios";

export function KudosFont(props) {
    const [options] = useState(["font-poppins font-bold", "font-poppins font-medium italic", "font-montserrat font-bold", "font-bebas_neue", "font-quicksand font-medium", "font-josefin_sans", "font-great_vibes", "font-dancing_script", "font-nanum_pen_script"])

    function updateParent(page, sender, reciever, receipient_id, message, gif, font, points) {
        props.onChange(page, sender, reciever, receipient_id, message, gif, font, points);
    }

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[930px]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center">
                            <div className="bg-white w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex items-center">
                                <div className="w-full flex justify-between space-x-8">
                                    <div>
                                        <h1 className="font-poppins font-medium text-[40px] w-full">Select a style</h1>
                                        <div className="py-2 px-8">
                                            {options.map((style, id) =>
                                                <button
                                                className={style.concat(" border-[10px] m-2 text-xl w-16 h-16").concat(props.font === style ? " border-black" : " border-[#C2C2C2]")}
                                                key={id} 
                                                value="Aa"
                                                onClick={(e) => {
                                                    updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, style, props.points)}}>
                                                    Aa
                                                </button>
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <div className="w-full flex justify-center space-x-6 pt-8">
                                                <div onClick={() => {updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                                    <BackButton/>
                                                </div>
                                                <Link to="/dashboard">
                                                    <HomeButton/> 
                                                </Link>
                                                <div onClick={() => {
                                                    updateParent(kudosStateOptions.Result, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                                    <NextButton/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex grow-0 border border-[#707070]'>
                                        <p className={"p-2 text-2xl ".concat(props.font)}>{props.draft}</p>
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
                            <div>
                                <h1 className="font-poppins font-medium text-[40px] w-full">Select a style</h1>
                                    <div className="px-20 py-4">
                                        {options.map((style, id) =>
                                            <button
                                            className={style.concat(" border-[10px] m-2 text-xl w-16 h-16").concat(props.font === style ? " border-black" : " border-[#C2C2C2]")}
                                            key={id} 
                                            value="Aa"
                                            onClick={(e) => {
                                                updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, style, props.points)}}>
                                                Aa
                                            </button>
                                        )}
                                    </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-center">
                                    <div className='w-3/4 h-80 flex border border-[#707070]'>
                                        <p className={"p-2 text-2xl text-left ".concat(props.font)}>{props.draft}</p>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center space-x-6 py-8">
                                    <div onClick={() => {updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                        <BackButton/>
                                    </div>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        updateParent(kudosStateOptions.Result, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
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