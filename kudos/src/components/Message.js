import axios from 'axios';
import { React, useState } from 'react';
import { prefix } from '..';
import thumbsUp from "../assets/thumbs-up-regular.svg";

export function Message(props) {
    const first_name_url = prefix + "/api/user/firstName";
    const [first, setFirst] = useState(obtainFirstName(props.sender));

    function obtainFirstName() {
        axios.get(first_name_url, { params: {
            user_id: props.sender
        }}).then(response => {
            setFirst(response.data.name[0]["first_name"]);
        })
        .catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="w-full flex justify-center">
            <div className="border-2 border-champagne drop-shadow-xl w-3/5">
                <div className="w-full place-self-center">
                    <div className="bg-champagne p-2">
                        <div>
                            <div className="flex -space-x-1">
                                <div className="border-4 border-grape bg-plum w-full p-4">
                                    <div>
                                        <p className="text-white font-serif pb-4">From: {first}</p>
                                        <div className="w-full h-full flex justify-center">
                                            <img
                                                className='border-[4px] border-blueberry rounded-lg flex place-self-center'
                                                src={props.gif}
                                                alt="gif"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full border-4 border-grape bg-plum p-4'>
                                    <div className="w-full flex justify-end pb-4">
                                        <div className='bg-grape rounded-full w-16 h-16 flex items-center justify-center'>
                                            <div>
                                                <img src={thumbsUp} alt="thumbs-up" className="w-6 ml-2"/>
                                                <p className={`place-self-center text-white font-bold`}>+{props.points}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-white ${props.font}`}>{props.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}