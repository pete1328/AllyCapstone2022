import { React } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import thumbsUp from "../assets/thumbs-up-regular.svg";
import axios from 'axios';

export function KudosResult(props) {
    function updateParent(page, sender, reciever, receipient_id, message, gif, font, points) {
        props.onChange(page, sender, reciever, receipient_id, message, gif, font, points);
    }

    const url = "http://localhost:3001/api/appreciation/add";

    const handleSubmit = () => {
        axios.post(url, {
          user_id: props.user.user_id,
          user_receive_id: props.receipient_id,
          kudos_points: props.points,
          gif: props.gif,
          message: props.draft
        }).then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
      };

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[930px]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center">
                            <div className="bg-white w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex justify-center">
                                <div className='place-self-center'>
                                    <div className='flex space-x-24'>
                                        <div className="w-96 space-y-4">
                                            <div className='bg-plum rounded-full w-24 h-24 flex items-center justify-center'>
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
                                        <div className='w-full flex pr-4'>
                                            <p className={"w-full h-min place-self-center text-3xl  ".concat(props.font)}>{props.draft}</p>
                                        </div>
                                    </div>
                                    <div className="flex justify-center space-x-6 pt-10">
                                    <div onClick={() => {updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                        <BackButton/>
                                    </div>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        handleSubmit();
                                        updateParent(kudosStateOptions.Share, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
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
                        <div>
                            <div>
                                <div className="w-full">
                                    <div className='bg-plum rounded-full w-24 h-24 flex items-center justify-center ml-4 mt-4'>
                                        <div>
                                            <img src={thumbsUp} alt="thumbs-up" className="w-10"/>
                                            <p className='place-self-center text-white text-lg font-poppins font-bold'>+{props.points}</p>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center pt-6">
                                        <img
                                            className='border-[4px] border-[#C2C2C2] w-3/4'
                                            src={props.gif}
                                            alt="gif"
                                        />
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <div className='w-3/4 pt-8 pb-4 flex'>
                                            <p className={"w-full h-min place-self-center text-3xl  ".concat(props.font)}>{props.draft}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-center space-x-6 py-6">
                                    <div onClick={() => {updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                        <BackButton/>
                                    </div>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        handleSubmit();
                                        updateParent(kudosStateOptions.Share, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
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