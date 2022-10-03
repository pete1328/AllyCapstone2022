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

    function updateParent(page, message, gif, font, points) {
        props.onChange(page, message, gif, font, points);
    }

    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex items-center">
                        <div className="w-full flex justify-between space-x-8 h-3/4">
                            <div>
                                <h1 className="font-poppins font-medium text-[34px] w-full pb-10 pt-20 mr-40">Give them some kudos</h1>
                                <KudosSlider
                                    valueLabelDisplay="auto"
                                    defaultValue={points}
                                    step={25}
                                    marks
                                    min={25}
                                    max={1000}
                                    onChange={changeValue}/>
                                <p className='font-poppins font-medium'>{points} Kudo Points</p>
                                <div className="w-full">
                                    <div className="w-full flex justify-center space-x-6 pt-8">
                                        <div onClick={() => {updateParent(kudosStateOptions.Gif, props.draft, props.gif, props.font, points)}}>
                                            <BackButton/>
                                        </div>
                                        <Link to="/dashboard">
                                            <HomeButton/> 
                                        </Link>
                                        <div onClick={() => {updateParent(kudosStateOptions.Font, props.draft, props.gif, props.font, points)}}>
                                            <NextButton/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 flex grow-0 border border-[#707070]'>
                                <p className={"p-2 text-2xl ".concat(props.font)}>{props.draft}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}