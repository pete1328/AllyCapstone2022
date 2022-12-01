import { React } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import thumbsUp from "../assets/thumbs-up-regular.svg";
import axios from 'axios';
import { database_prefix } from '..';
import { postcard_styles } from './TestData';

export function KudosResult(props) {
    function updateParent(page, sender, reciever, receipient_id, message, gif, font, points) {
        props.onChange(page, sender, reciever, receipient_id, message, gif, font, points);
    }

    const url_add_appreciation = database_prefix + "/api/appreciation/add";

    const handleSubmit = () => {
        axios.post(url_add_appreciation, {
          user_id: props.user.user_id,
          user_receive_id: props.receipient_id,
          kudos_points: props.points,
          gif: props.gif,
          font: props.font,
          style: Math.floor(Math.random()*postcard_styles.length),
          message: props.draft
        }).then(response => {
          //console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
      };

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] sm:w-[65rem] 2xl:w-[85rem]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center h-screen flex items-center">
                            <div className="bg-grape sm:w-[878px] 2xl:w-[1400px] h-2/3 drop-shadow-xl rounded-lg px-16">
                                <div className='h-full w-full flex items-center'>
                                    <div className='place-self-center w-full space-y-10'>
                                        <div className='w-full flex justify-end'>
                                            <div className='bg-seafoam rounded-xl border-2 border-dotted border-champagne w-24 h-24 flex items-center justify-center'>
                                                <div>
                                                    <img src={thumbsUp} alt="thumbs-up" className="w-10"/>
                                                    <p className='place-self-center text-white text-lg font-serif font-bold'>+{props.points}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex space-x-24'>
                                            <div className="w-fit space-y-4">
                                                <img
                                                    className='border-2 border-champagne rounded-lg w-fit sm:max-h-56 2xl:max-h-96'
                                                    src={props.gif}
                                                    alt="gif"
                                                />
                                            </div>
                                            <div className='w-full flex pr-4'>
                                                <p className={"w-full h-min place-self-center md:text-3xl 2xl:text-5xl text-white ".concat(props.font)}>{props.draft}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center space-x-6 pt-10">
                                        <div onClick={() => {updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
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
                </div>
            }
            {/** Mobile View */}
            { props.mobile === 1 &&
                <div className="p-6">
                    <div className="bg-grape border-4 border-blueberry drop-shadow-lg">
                        <div>
                            <div>
                                <div className="w-full">
                                    <div className='flex justify-end pr-8'>
                                        <div className='bg-seafoam rounded-xl border-champagne border-2 border-dotted w-24 h-24 flex items-center justify-center ml-4 mt-4'>
                                            <div>
                                                <img src={thumbsUp} alt="thumbs-up" className="w-10"/>
                                                <p className='place-self-center text-white text-lg font-serif font-bold'>+{props.points}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center pt-6">
                                        <img
                                            className='border-[4px] border-champagne rounded-lg w-3/4'
                                            src={props.gif}
                                            alt="gif"
                                        />
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <div className='w-3/4 pt-8 pb-4 flex'>
                                            <p className={"w-full h-min place-self-center text-3xl text-white ".concat(props.font)}>{props.draft}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-center space-x-6 py-6">
                                    <div onClick={() => {updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
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