import { React, useState } from 'react';
import { Link } from "react-router-dom";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { HomeButton } from "../components/Button";
import thumbsUp from "../assets/thumbs-up-regular.svg";
import { Button, TextField } from '@mui/material';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { prefix } from '..';

export function KudosShare(props) {

    const url = prefix + "/api/user/email";

    function obtainEmail() {
        axios.get(url, { params: {
            user_id: props.receipient_id
        }}).then(response => {
            setToEmail(response.data.address[0]["email"]);
        })
        .catch(error => {
            console.log(error);
            setToEmail("No address on file");
        })
    }

    const [toEmail, setToEmail] = useState("");

    var templateParams = {
        to_email: toEmail,
        from_name: props.sender,
        to_name: props.reciever,
        message: props.draft,
        points: props.points,
        gif: props.gif
    };

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[930px]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center">
                            <div className="bg-grape w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex justify-center">
                                <div className='place-self-center'>
                                    <div className='flex space-x-24'>
                                        <div className="w-96 space-y-4">
                                            <div className='bg-plum rounded-full w-24 h-24 flex items-center justify-center'>
                                                <div>
                                                    <img src={thumbsUp} alt="thumbs-up" className="w-10"/>
                                                    <p className='place-self-center text-white text-lg font-serif font-bold'>+{props.points}</p>
                                                </div>
                                            </div>
                                            <img
                                                className='border-[4px] border-blueberry'
                                                src={props.gif}
                                                alt="gif"
                                            />
                                        </div>
                                        <div className='w-full h-auto flex pr-4'>
                                            <p className={"place-self-center text-3xl text-white ".concat(props.font)}>{props.draft}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-evenly'>
                                        <div className="flex justify-center pt-8">
                                            <TextField
                                            className='bg-champagne rounded-md h-min'
                                            size='small'
                                            label="Enter email address"
                                            defaultValue={obtainEmail()}
                                            value={toEmail}
                                            onChange={(e) => {setToEmail(e.target.value)}}
                                            />
                                            <Button
                                            variant='contained'
                                            onClick={() => {
                                                emailjs.send('service_bb4ww0h', 'template_87mq0br', templateParams, '7FCzOaiV5SVqj3Vng')
                                                .then(function(response) {
                                                    console.log('SUCCESS!', response.status, response.text);
                                                }, function(error) {
                                                    console.log('FAILED...', error);
                                                });
                                                setToEmail("");
                                            }}>
                                                <div className='flex justify-evenly space-x-2'>
                                                    <p className='place-self-center'>send</p>
                                                </div>
                                            </Button>
                                            <div className="px-8">
                                                <Link to="/dashboard">
                                                    <HomeButton/> 
                                                </Link>
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
                        <div className="flex-nowrap justify-center text-center w-full">
                            <div>
                                <div>
                                    <div className="w-full">
                                        <div className='bg-plum rounded-full w-24 h-24 flex items-center justify-center ml-4 mt-4'>
                                            <div>
                                                <img src={thumbsUp} alt="thumbs-up" className="w-10"/>
                                                <p className='place-self-center text-white text-lg font-serif font-bold'>+{props.points}</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center pt-6">
                                            <img
                                                className='border-[4px] border-blueberry w-3/4'
                                                src={props.gif}
                                                alt="gif"
                                            />
                                        </div>
                                        <div className="w-full flex justify-center">
                                            <div className='w-3/4 pt-8 pb-4 flex'>
                                                <p className={"w-full h-min place-self-center text-3xl text-white  ".concat(props.font)}>{props.draft}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex justify-center space-x-6 py-6">
                                    <div className="flex justify-center pt-8">
                                        <TextField
                                        className='bg-champagne rounded-md h-min'
                                        size='small'
                                        label="Enter email address"
                                        value={toEmail}
                                        onChange={(e) => {setToEmail(e.target.value)}}
                                        />
                                        <Button
                                        variant='contained'
                                        onClick={() => {
                                            emailjs.send('service_bb4ww0h', 'template_87mq0br', templateParams, '7FCzOaiV5SVqj3Vng')
                                            .then(function(response) {
                                                console.log('SUCCESS!', response.status, response.text);
                                            }, function(error) {
                                                console.log('FAILED...', error);
                                            });
                                            setToEmail("");
                                        }}>
                                        <div className='flex justify-evenly space-x-2'>
                                            <p className='place-self-center'>send</p>
                                        </div>
                                        </Button>
                                        <div className="px-8">
                                            <Link to="/dashboard">
                                                <HomeButton/> 
                                            </Link>
                                        </div>
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