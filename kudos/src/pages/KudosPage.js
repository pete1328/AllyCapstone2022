import { React, useState, useEffect } from "react";
import { KudosCustom } from "../components/KudosCustom";
import { KudosWizard } from "../components/KudosWizard";
import { KudosPoints } from "../components/KudosPoints";
import { KudosGif } from "../components/KudosGif";
import { KudosFont } from "../components/KudosFont";
import { KudosResult } from "../components/KudosResult";
import { KudosShare } from "../components/KudosShare";
import { getWindowDimensions } from "./HomePage";

export const kudosStateOptions = {
    Custom : 'custom',
    Wizard : 'wizard',
    Points : 'points',
    Gif : 'gif',
    Font : 'font',
    Result : 'result',
    Share : 'share'
}

export function KudosPage (props) {
    const [kudosState, setKudosState] = useState(kudosStateOptions.Custom);
    const [sender, setSender] = useState(props.user.first_name);
    const [reciever, setReciever] = useState("");
    const [draft, setDraft] = useState("");
    const [gif, setGif] = useState("");
    const [font, setFont] = useState("font-poppins font-bold");
    const [points, setPoints] = useState(25);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const isMobile = (windowDimensions.width <= 768) ? 1 : 0;

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    function updateParent(page, sender, reciever, message, gif, font, points) {
        setKudosState(page);
        setSender(sender);
        setReciever(reciever);
        setDraft(message);
        setGif(gif)
        setFont(font);
        setPoints(points);
    }

    return (
        <main>
            { kudosState === kudosStateOptions.Custom &&
                <KudosCustom kudosState={kudosStateOptions.Custom} draft={draft} gif={gif} font={font} points={points} sender={sender} reciever={reciever} mobile={isMobile} users={props.users} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Wizard &&
                <KudosWizard kudosState={kudosStateOptions.Wizard} draft={draft} gif={gif} font={font} points={points} sender={sender} reciever={reciever} mobile={isMobile} users={props.users} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Gif &&
                <KudosGif kudosState={kudosStateOptions.Gif} draft={draft} gif={gif} font={font} points={points} sender={sender} reciever={reciever} mobile={isMobile} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Points &&
                <KudosPoints kudosState={kudosStateOptions.Points} draft={draft} gif={gif} font={font} points={points} sender={sender} reciever={reciever} mobile={isMobile} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Result &&
                <KudosResult kudosState={kudosStateOptions.Result} draft={draft} gif={gif} font={font} points={points} sender={sender} reciever={reciever} mobile={isMobile} user={props.user} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Font &&
                <KudosFont kudosState={kudosStateOptions.Font} draft={draft} gif={gif} font={font} points={points} sender={sender} reciever={reciever} mobile={isMobile} onChange={updateParent}/>
            }
            { kudosState === kudosStateOptions.Share &&
                <KudosShare kudosState={kudosStateOptions.Share} draft={draft} gif={gif} font={font}  points={points} sender={sender} reciever={reciever} mobile={isMobile} onChange={updateParent}/>
            }         
        </main>
    )
}