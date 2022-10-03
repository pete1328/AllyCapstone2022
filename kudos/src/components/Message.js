import { React } from 'react';
import thumbsUp from "../assets/thumbs-up-regular.svg";

export function Message(props) {
    return (
        <div className="flex justify-center">
            <div className="flex place-self-center border-4">
                <div className="place-self-center">
                    <div className="bg-white w-auto h-auto drop-shadow-xl rounded-lg flex justify-center">
                        <div className='place-self-center'>
                            <div className="p-2 flex justify-between">
                                <div>
                                    <p className="text-lg font-poppins font-medium">From: {props.sender}</p>
                                    <p className="text-lg font-poppins font-medium">To: {props.reciever}</p>
                                </div>
                                <div className='bg-plum rounded-full w-16 h-16 flex items-center justify-center'>
                                    <div>
                                        <img src={thumbsUp} alt="thumbs-up" className="w-6 ml-2"/>
                                        <p className='place-self-center text-white font-poppins font-bold'>+{props.points}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex py-8 px-2 space-x-4'>
                                <div className="flex space-x-4">
                                    
                                    <img
                                        className='border-[4px] border-[#C2C2C2] w-32 h-32'
                                        src={props.gif}
                                        alt="gif"
                                    />
                                </div>
                                <div className='w-96 h-auto border-4 p-1'>
                                    <p className={props.font}>{props.text}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}