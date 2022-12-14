import { React, useState } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import axios from 'axios';
import { ml_prefix } from '..';

const status_options = {
    default : "",
    processing : "Analyzing positivity of user message.",
    failed : "Uh oh! Your message is not very positive. Please return and edit your message.",
    success : "Success!",
    error : "Failed to establish connection to server."
}

export function KudosFont(props) {
    const [options] = useState(["font-poppins font-bold", "font-poppins font-medium italic", "font-montserrat font-bold", "font-bebas_neue", "font-quicksand font-medium text", "font-josefin_sans", "font-great_vibes ", "font-dancing_script", "font-nanum_pen_script"]);
    const validation_url = ml_prefix + "/api/validate";
    const [status, setStatus] = useState(status_options.default);

    function updateParent(page, sender, reciever, receipient_id, message, gif, font, points) {
        props.onChange(page, sender, reciever, receipient_id, message, gif, font, points);
    }
    
    // axios request for ML
    const validateMessage = () => {
        setStatus(status_options.processing);
        axios.get(validation_url, { params: {
          message: props.draft,
        }})
        .then(response => {
            if (response.data.result) {
                let result = response.data.points;
                if(result === 0 || result === undefined || result < 0) {
                    result = 25;
                }
                setStatus(status_options.success);
                updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, result);
            } else {
                setStatus(status_options.failed);
            }
        })
        .catch(error => {
            setStatus(status_options.error);
            console.log(error);
        });
      }

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] sm:w-[65rem] 2xl:w-[85rem]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center h-screen flex items-center">
                            <div className="bg-grape sm:w-[878px] 2xl:w-[1400px] sm:h-1/2 2xl:h-2/3 drop-shadow-xl rounded-lg px-10 flex items-center">
                                <div className="w-full h-3/4 flex justify-between space-x-8">
                                    <div>
                                        <h1 className="font-serif text-white font-medium text-[40px] 2xl:text-[48px] w-full">Select a style</h1>
                                        <div className="py-2 md:px-8">
                                            {options.map((style, id) =>
                                                <button
                                                className={style.concat(" border-[10px] m-2 text-xl w-16 h-16").concat(props.font === style ? " border-seafoam bg-champagne" : " border-blueberry bg-champagne")}
                                                key={id} 
                                                value="Aa"
                                                onClick={(e) => {
                                                    updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, style, props.points)}}>
                                                    Aa
                                                </button>
                                            )}
                                        </div>
                                        {
                                            status !== status_options.default &&
                                            <div className='bg-champagne border-blueberry border border-dashed p-2 flex justify-center items-center py-2'>
                                                <div className={status === status_options.failed | status === status_options.error ? 'text-red-500 font-bold font-serif' : 'text-plum font-bold font-serif'}>{status}</div>
                                            </div>
                                        }
                                        <div className="w-full">
                                            <div className="w-full flex justify-center space-x-6 md:pt-4">
                                                <div onClick={() => {updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                                    <BackButton/>
                                                </div>
                                                <Link to="/dashboard">
                                                    <HomeButton/> 
                                                </Link>
                                                <div onClick={() => {
                                                    if (status === status_options.default) {
                                                        validateMessage()
                                                    }}}>
                                                    <NextButton disabled={status !== status_options.default}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex grow-0 border border-blueberry bg-champagne'>
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
                    <div className="bg-grape border-4 border-blueberry drop-shadow-lg">
                        <div className="flex-nowrap justify-center text-center pt-12 w-full">
                            <div>
                                <h1 className="font-serif text-white font-medium text-[40px] w-full">Select a style</h1>
                                    <div className="px-2 py-4">
                                        {options.map((style, id) =>
                                            <button
                                            className={style.concat(" border-[10px] m-2 text-xl w-16 h-16").concat(props.font === style ? " border-seafoam bg-champagne" : " border-blueberry bg-champagne")}
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
                                    <div className='w-3/4 h-80 flex border border-blueberry bg-champagne'>
                                        <p className={"p-2 text-left text-2xl ".concat(props.font)}>{props.draft}</p>
                                    </div>
                                </div>
                                {
                                    status !== status_options.default &&
                                    <div className='pt-4'>
                                        <div className='bg-champagne border-blueberry border border-dashed p-2 flex justify-center items-center py-2'>
                                            <div className={status === status_options.failed | status === status_options.error ? 'text-red-500 font-bold font-serif' : 'text-plum font-bold font-serif'}>{status}</div>
                                        </div>
                                    </div>
                                    
                                }
                                <div className="w-full flex justify-center space-x-6 py-8">
                                    <div onClick={() => {updateParent(kudosStateOptions.Font, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                        <BackButton/>
                                    </div>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        if (status === status_options.default) {
                                            validateMessage()
                                        }}}>
                                        <NextButton disabled={status !== status_options.default}/>
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