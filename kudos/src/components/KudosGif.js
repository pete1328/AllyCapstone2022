import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { ImageList, ImageListItem } from '@mui/material';
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import { gifOptions } from './TestData';

export function KudosGif(props) {
    const [question] = useState("Select a GIF")

    function updateParent(page, message, gif) {
        props.onChange(page, message, gif);
    }

    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="z-0 fixed place-self-center rotate-[10deg] w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[878px] h-[556px] drop-shadow-xl rounded-lg px-10 flex items-center">
                        <div className="w-full flex justify-between space-x-8">
                            <div>
                                <h1 className="font-poppins font-medium text-[40px] w-full">{question}</h1>
                                <ImageList sx={{ width: 450, height: 300 }} cols={3} rowHeight={164}>
                                    {gifOptions.map((item, id) => (
                                        <ImageListItem key={id}>
                                            <img
                                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                alt={id}
                                                loading="lazy"
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                                <div className="w-full">
                                    <div className="w-full flex justify-center space-x-6 pt-8">
                                        <div onClick={() => {updateParent(kudosStateOptions.Custom, props.draft, props.gif)}}>
                                            <BackButton/>
                                        </div>
                                        <Link to="/dashboard">
                                            <HomeButton/> 
                                        </Link>
                                        <div onClick={() => {updateParent(kudosStateOptions.Gif, props.draft, props.gif)}}>
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