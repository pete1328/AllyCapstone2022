import { React } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { HomeButton } from "../components/Button";
import thumbsUp from "../assets/thumbs-up-regular.svg";

export function KudosShare(props) {
    return (
        <div className="flex justify-center h-screen w-screen">
            <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[930px]" src={envelopeClosed} alt="envelope"/>
            <div className="z-10 fixed flex place-self-center">
                <div className="place-self-center">
                    <div className="bg-white w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex justify-center">
                        <div className='place-self-center'>
                            <div className='flex space-x-24'>
                                <div className="w-96 space-y-4">
                                    <div className='bg-[#8D8D8D] rounded-full w-24 h-24 flex items-center justify-center'>
                                        <div>
                                            <img src={thumbsUp} alt="thumbs-up" className="w-10"/>
                                            <p className='place-self-center text-white text-lg font-poppins font-bold'>+{props.points}</p>
                                        </div>
                                    </div>
                                    <img
                                        className='border-[4px] border-[#C2C2C2]'
                                        src={props.gif}
                                        alt="gif"
                                    />
                                </div>
                                <div className='w-full h-auto flex pr-4'>
                                    <p className={"text-3xl place-self-center ".concat(props.font)}>{props.draft}</p>
                                </div>
                            </div>
                            <div className="flex justify-center space-x-6 pt-10">
                            <Link to="/dashboard">
                                <HomeButton/> 
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}