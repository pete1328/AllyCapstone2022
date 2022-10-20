import { React } from 'react';
import thumbsUp from "../assets/thumbs-up-regular.svg";

export function Message(props) {
    return (
        <div className="w-full flex justify-center">
            <div className="border-4 w-3/5">
                <div className="w-full place-self-center">
                    <div className="bg-blueberry p-2">
                        <div>
                            <div className="flex -space-x-[1.5px]">
                                <div className="border-2 w-full p-4">
                                    <div className="w-full flex justify-center">
                                        <img
                                            className='border-[4px] border-white rounded-lg'
                                            src={props.gif}
                                            alt="gif"
                                        />
                                    </div>
                                </div>
                                <div className='w-full border-2 p-4'>
                                    <div className="w-full flex justify-end pb-4">
                                        <div className='bg-plum rounded-full w-16 h-16 flex items-center justify-center'>
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