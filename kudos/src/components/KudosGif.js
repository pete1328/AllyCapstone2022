import { React } from 'react';
import { Link } from "react-router-dom";
import { Autocomplete, ImageList, ImageListItem, TextField } from '@mui/material';
import envelopeClosed from '../assets/envelopeClosed.svg';
import { BackButton, HomeButton, NextButton } from "../components/Button";
import { kudosStateOptions } from '../pages/KudosPage';
import { gifOptions, top100Films } from './TestData';

export function KudosGif(props) {
    function updateParent(page, sender, reciever, receipient_id, message, gif, font, points) {
        props.onChange(page, sender, reciever, receipient_id, message, gif, font, points);
    }

    return (
        <div>
            {/** Desktop View */}
            { props.mobile === 0 &&
                <div className="flex justify-center h-screen w-screen">
                    <img className="z-0 fixed place-self-center rotate-[10deg] md:w-[930px]" src={envelopeClosed} alt="envelope"/>
                    <div className="z-10 fixed flex place-self-center">
                        <div className="place-self-center">
                            <div className="bg-white w-[700px] md:w-[878px] h-auto drop-shadow-xl rounded-lg p-10 flex items-center">
                                <div className="w-full flex justify-between space-x-8">
                                    <div>
                                        <h1 className="font-poppins font-medium text-[40px] w-full">Select a GIF</h1>
                                        <div className='pb-4'>
                                            {/* <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                defaultValue={[top100Films[13]]}
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    placeholder="Search"
                                                />
                                                )}
                                            /> */}
                                        </div>
                                        <ImageList sx={{ width: 400, height: 250 }} cols={3} rowHeight={150}>
                                            {gifOptions.map((item, id) => (
                                                <ImageListItem key={id}>
                                                    <img
                                                        className={(item === props.gif) ? "border-4 border-plum rounded-md" : (props.gif === "" ? "border-4 border-[#C2C2C2] rounded-md" : "border-4 border-[#C2C2C2] rounded-md blur-sm")}
                                                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={id}
                                                        onClick={() => {
                                                            if (item === props.gif) {
                                                                updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.receipient_id, props.draft, "", props.font, props.points)
                                                            } else {
                                                                updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.receipient_id, props.draft, item, props.font, props.points)
                                                            }}}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                        <div className="w-full">
                                            <div className="w-full flex justify-center space-x-6 pt-8">
                                                <div onClick={() => {updateParent(kudosStateOptions.Custom, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                                    <BackButton/>
                                                </div>
                                                <Link to="/dashboard">
                                                    <HomeButton/> 
                                                </Link>
                                                <div onClick={() => { if (props.gif.length > 0) {
                                                    updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}}>
                                                    <NextButton disabled={props.gif.length === 0}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex grow-0 border border-[#707070]'>
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
                    <div className="bg-white border-4 border-[#D4D4D4] drop-shadow-lg">
                        <div className="flex-nowrap justify-center text-center pt-12 w-full">
                            <div>
                                <h1 className="font-poppins font-medium text-[40px] w-full">Select a GIF</h1>
                                <div className="w-full flex justify-center">
                                    <div>
                                        <div className='py-4 w-full'>
                                            {/* <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={top100Films}
                                                getOptionLabel={(option) => option.title}
                                                defaultValue={[top100Films[13]]}
                                                renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    placeholder="Search"
                                                />
                                                )}
                                            /> */}
                                        </div>
                                        <ImageList sx={{ width: 300, height: 300 }} cols={2} rowHeight={150}>
                                            {gifOptions.map((item, id) => (
                                                <ImageListItem key={id}>
                                                    <img
                                                        className={(item === props.gif) ? "border-4 border-plum rounded-md" : (props.gif === "" ? "border-4 border-[#C2C2C2] rounded-md" : "border-4 border-[#C2C2C2] rounded-md blur-sm")}
                                                        src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                                        srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                        alt={id}
                                                        onClick={() => {
                                                            if (item === props.gif) {
                                                                updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.receipient_id, props.draft, "", props.font, props.points)
                                                            } else {
                                                                updateParent(kudosStateOptions.Gif, props.sender, props.reciever, props.receipient_id, props.draft, item, props.font, props.points)
                                                            }}}
                                                        loading="lazy"
                                                    />
                                                </ImageListItem>
                                            ))}
                                        </ImageList>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="flex justify-center pt-6">
                                    <div className='w-3/4 h-72 flex border border-[#707070]'>
                                        <p className={"p-2 text-2xl text-left ".concat(props.font)}>{props.draft}</p>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center space-x-6 py-6">
                                    <div onClick={() => {updateParent(kudosStateOptions.Custom, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}>
                                        <BackButton/>
                                    </div>
                                    <Link to="/dashboard">
                                        <HomeButton/> 
                                    </Link>
                                    <div onClick={() => {
                                        if (props.gif.length > 0) {updateParent(kudosStateOptions.Points, props.sender, props.reciever, props.receipient_id, props.draft, props.gif, props.font, props.points)}}}>
                                        <NextButton disabled={props.gif.length === 0}/>
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