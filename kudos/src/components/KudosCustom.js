import { React, useState } from 'react';
import { Link } from "react-router-dom";
import { TextField, Autocomplete } from "@mui/material";
import envelopeClosed from '../assets/envelopeClosed.svg';
import { TryNowButton, BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';

export function KudosCustom(props) {
    const [name, setName] = useState("");
    const [receipient, setReceipient] = useState(0);

    function updateParent(page, sender, reciever, receipient_id, message, gif, font, points) {
        props.onChange(page, sender, reciever, receipient_id, message, gif, font, points);
    }

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] sm:w-[65rem] 2xl:w-[85rem]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center h-screen flex items-center">
                            <div className="bg-grape sm:w-[878px] 2xl:w-[1400px] h-2/3 drop-shadow-xl rounded-lg flex items-center">
                                <div className='p-10 w-full'>
                                    <div className="w-full flex justify-between items-center">
                                        <h1 className="font-serif font-medium text-white sm:text-[32px] 2xl:text-[54px]">Make Someone's day better</h1>
                                        <div className="w-1/2">
                                            <div className='w-full flex justify-center'>
                                                <div className="bg-champagne sm:w-[257px] 2xl:w-3/4 sm:p-4 2xl:p-8 h-auto rounded-lg">
                                                    <div className="w-full text-center">
                                                        <p className="font-serif text-[18px] text-plum">At a loss for words? Try our gratitude wizard.</p>
                                                        <div className="flex w-full justify-center pt-4" onClick={() => {updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.receipient_id, "", props.gif, props.font, props.points)}}>
                                                            <TryNowButton/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mt-8">
                                            <div className="w-full flex justify-center">
                                                <Autocomplete
                                                    className='bg-champagne w-[88%] rounded-lg'
                                                    disablePortal
                                                    options={props.users}
                                                    getOptionLabel={(option) => option.name || ""}
                                                    renderInput={(params) => <TextField {...params}/>}
                                                    onChange={(event, value) => {
                                                        if (value != null) {
                                                            setReceipient(value["id"]);
                                                            setName(value["name"]);
                                                        } else {
                                                            setReceipient(0);
                                                            setName("");
                                                        }
                                                }}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-center py-6">
                                            <TextField
                                                className="w-[88%] bg-champagne rounded-lg"
                                                id="standard-multiline-static"
                                                label="Write your message down"
                                                multiline
                                                onChange={(e) => {updateParent(kudosStateOptions.Custom, props.sender, props.reciever, props.receipient_id, e.target.value, props.gif, props.font, props.points)}}
                                                defaultValue={props.draft}
                                                rows={4}/>
                                        </div>
                                        <div className="w-full flex justify-center space-x-6">
                                            <Link to="/dashboard">
                                                <BackButton/> 
                                            </Link>
                                            <Link to="/dashboard">
                                                <HomeButton/> 
                                            </Link>
                                            <div onClick={() => {
                                                if (props.draft.length > 0 && name != "") {
                                                    updateParent(kudosStateOptions.Gif, props.ssender, name, receipient, props.draft, props.gif, props.font, props.points)
                                                    }}}>
                                                <NextButton disabled={props.draft.length === 0 || name === ""}/>
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
                        <div className="flex-nowrap justify-center text-center pt-12 w-full">
                            <h1 className="p-2 font-serif font-medium text-white text-4xl">Make Someone's day better</h1>
                            <div className="w-full flex justify-center pt-4">
                                <div className="w-3/4 h-auto p-4 bg-champagne">
                                    <p className="font-serif text-[18px] text-plum py-4">At a loss for words? Try our gratitude wizard.</p>
                                    <div onClick={() => {updateParent(kudosStateOptions.Wizard, props.sender, props.reciever, props.receipient_id, "", props.gif, props.font, props.points)}}>
                                        <TryNowButton/>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div>
                                    <div className="w-full flex justify-center space-x-4 pt-6">
                                        <Autocomplete
                                            className='bg-champagne rounded-lg'
                                            fullWidth={true}
                                            disablePortal
                                            options={props.users}
                                            getOptionLabel={(option) => option.name || ""}
                                            sx={{ width: 300 }}
                                            renderInput={(params) => <TextField {...params}/>}
                                            onChange={(event, value) => setReceipient(value["id"])}
                                        />
                                    </div>
                                    <div className="w-full flex justify-center py-6">
                                        <TextField
                                            className="w-3/4 bg-champagne rounded-lg"
                                            id="standard-multiline-static"
                                            label="Write your message down"
                                            multiline
                                            onChange={(e) => {updateParent(kudosStateOptions.Custom, props.sender, props.reciever, props.receipient_id, e.target.value, props.gif, props.font, props.points)}}
                                            defaultValue={props.draft}
                                            rows={4}/>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center space-x-6 pb-6">
                                    <Link to="/dashboard">
                                        <BackButton/> 
                                    </Link>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        if (props.draft.length > 0) {
                                        updateParent(kudosStateOptions.Gif, props.sender, name, receipient, props.draft, props.gif, props.font, props.points)
                                        }}}>
                                        <NextButton disabled={props.draft.length === 0}/>
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