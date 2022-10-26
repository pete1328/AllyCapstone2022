import { React, useState } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import { KudosSlider } from './Slider';

export function KudosPoints(props) {
    const [points, setPoints] = useState(props.points);

    const changeValue = (event, points) => {
        setPoints(points);
      };

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
                            <div className="bg-grape w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex items-center">
                                <div className="w-full flex justify-between space-x-8 h-3/4">
                                    <div>
                                        <h1 className="font-serif font-medium text-[34px] w-full pb-10 pt-20 mr-32 text-white">Give them some kudos</h1>
                                        <KudosSlider
                                            valueLabelDisplay="auto"
                                            value={points | 0}
                                            step={25}
                                            marks
                                            min={25}
                                            max={1000}
                                            onChange={changeValue}/>
                                        <p className='font-serif font-medium text-white'>{points} Kudo Points</p>
                                        <div className="w-full">
                                            <div className="w-full flex justify-center space-x-6 pt-8">
                                                <div onClick={() => {updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, points)}}>
                                                    <BackButton/>
                                                </div>
                                                <Link to="/dashboard">
                                                    <HomeButton/> 
                                                </Link>
                                                <div onClick={() => {updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, points)}}>
                                                    <NextButton/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-1/2 flex grow-0 border border-blueberry bg-champagne'>
                                        <p className={"p-2 text-2xl text-left ".concat(props.font)}>{props.draft}</p>
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
                            <div>
                                <h1 className="font-serif text-white font-medium text-[34px] w-full py-12">Give them some kudos</h1>
                                <div className="w-full flex justify-center">
                                    <div className="w-3/4">
                                        <KudosSlider
                                            valueLabelDisplay="auto"
                                            value={points}
                                            step={25}
                                            marks
                                            min={25}
                                            max={1000}
                                            onChange={changeValue}/>
                                    </div>
                                </div>
                                <p className='font-serif font-medium text-white py-4'>{points} Kudo Points</p>
                            </div>
                            <div>
                                <div className="flex justify-center py-6">
                                    <div className='w-3/4 h-80 flex border border-blueberry bg-champagne'>
                                        <p className={"p-2 text-2xl text-left ".concat(props.font)}>{props.draft}</p>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center space-x-6 py-6">
                                    <div onClick={() => {updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, points)}}>
                                        <BackButton/>
                                    </div>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, points)}}>
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